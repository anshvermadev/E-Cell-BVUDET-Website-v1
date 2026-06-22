function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    lock.waitLock(10000);
    
    console.log('🚀 POST request received');
    console.log('📥 Raw request data:', JSON.stringify(e, null, 2));
    
    // Handle different data formats
    var formData;
    
    if (e.postData && e.postData.contents) {
      console.log('📋 Processing postData.contents');
      console.log('📄 Content type:', e.postData.type);
      
      if (e.postData.type === 'application/json') {
        formData = JSON.parse(e.postData.contents);
      } else {
        // Form data - parse manually or use parameter
        formData = e.parameter || {};
      }
    } else if (e.parameter) {
      console.log('📋 Processing parameter data');
      formData = e.parameter;
    } else {
      throw new Error('No form data received');
    }
    
    console.log('✅ Parsed form data:', JSON.stringify(formData, null, 2));
    
    // ⚠️ IMPORTANT: Replace these with your actual spreadsheet IDs
    // Make sure these are your actual Google Sheets IDs, not placeholder text
    const RECRUITMENT_SPREADSHEET_ID = '1LLxjKbzPdyNsoAfP4KE0PJNQkpz8p3BcnIKSDuIyN_A';
    const REGISTRATION_SPREADSHEET_ID = '1C78H0eW-CezNN158kS4WgPzATBMiwH_gZCAbjKcj6wA';
    
    // 🔍 DEBUG: Log the configured IDs
    console.log('🔧 RECRUITMENT_SPREADSHEET_ID configured as:', RECRUITMENT_SPREADSHEET_ID);
    console.log('🔧 REGISTRATION_SPREADSHEET_ID configured as:', REGISTRATION_SPREADSHEET_ID);
    
    // Check if this looks like a recruitment form
    const recruitmentFields = ['contactNo', 'branch', 'year', 'positions', 'whyJoin'];
    const hasRecruitmentFields = recruitmentFields.some(field => formData.hasOwnProperty(field) && formData[field]);
    
    console.log('🔍 Has recruitment fields:', hasRecruitmentFields);
    console.log('🔍 Field check details:');
    recruitmentFields.forEach(field => {
      console.log(`  ${field}: ${formData[field] ? 'YES' : 'NO'} (value: "${formData[field] || ''}")`);
    });
    
    // Select spreadsheet based on form type
    var spreadsheetId, sheetName;
    if (hasRecruitmentFields) {
      spreadsheetId = RECRUITMENT_SPREADSHEET_ID;
      sheetName = 'Recruitment_2025';
      console.log('📊 Selected: RECRUITMENT form');
    } else {
      spreadsheetId = REGISTRATION_SPREADSHEET_ID;
      sheetName = 'Registrations';
      console.log('📊 Selected: REGISTRATION form');
    }
    
    console.log('📋 Using spreadsheet ID:', spreadsheetId);
    console.log('📄 Using sheet name:', sheetName);
    
    // 🚨 Better validation for spreadsheet ID
    if (!spreadsheetId) {
      throw new Error('Spreadsheet ID is null or undefined');
    }
    
    if (spreadsheetId.length < 10) {
      throw new Error('Spreadsheet ID appears to be too short: ' + spreadsheetId);
    }
    
    if (spreadsheetId.includes('YOUR_') || spreadsheetId.includes('SPREADSHEET_ID_HERE')) {
      throw new Error(`Spreadsheet ID not properly configured. Current value: "${spreadsheetId}". Please replace with your actual Google Sheets ID.`);
    }
    
    // Test if we can access the spreadsheet
    var ss;
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
      console.log('✅ Successfully opened spreadsheet:', ss.getName());
    } catch (accessError) {
      console.error('❌ Cannot access spreadsheet:', accessError.toString());
      throw new Error(`Cannot access spreadsheet with ID: ${spreadsheetId}. Error: ${accessError.message}`);
    }
    
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      console.log('📝 Creating new sheet:', sheetName);
      sheet = ss.insertSheet(sheetName);
      
      if (hasRecruitmentFields) {
        // Recruitment form headers
        sheet.getRange(1, 1, 1, 10).setValues([[
          'Timestamp', 'Name', 'Email', 'Contact No', 'Branch', 
          'Year', 'Positions', 'Why Join', 'Past Experience', 'Resume URL'
        ]]);
        sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#4285F4').setFontColor('white');
      } else {
        // Registration form headers  
        sheet.getRange(1, 1, 1, 9).setValues([[
          'Timestamp', 'Name', 'Email', 'Phone', 'Graduation Year',
          'Business Idea', 'Funding', 'Progress', 'CollegeID URL'
        ]]);
        sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
      }
      console.log('✅ Created sheet with headers');
    }
    
    // Handle file uploads
    var fileUrl = '';
    
    try {
      if (hasRecruitmentFields && formData.resume) {
        console.log('📎 Processing resume upload...');
        
        // Create or get resume folder
        var resumeFolderName = 'Recruitment Resumes 2025';
        var resumeFolder;
        var folders = DriveApp.getFoldersByName(resumeFolderName);
        if (folders.hasNext()) {
          resumeFolder = folders.next();
        } else {
          resumeFolder = DriveApp.createFolder(resumeFolderName);
          console.log('📁 Created folder:', resumeFolderName);
        }
        
        // Process base64 file
        var resumeData = String(formData.resume);
        var base64Data = resumeData.includes(',') ? resumeData.split(',')[1] : resumeData;
        
        if (base64Data && base64Data.length > 0) {
          var resumeBlob = Utilities.newBlob(
            Utilities.base64Decode(base64Data),
            'application/octet-stream',
            'resume.pdf'
          );
          
          var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
          var fileName = `${formData.name || 'candidate'}_Resume_${timestamp}`.replace(/[^a-zA-Z0-9_]/g, '_');
          
          var resumeFile = resumeFolder.createFile(resumeBlob);
          resumeFile.setName(fileName);
          fileUrl = resumeFile.getUrl();
          
          console.log('✅ Resume uploaded:', fileName);
        }
      } else if (!hasRecruitmentFields && formData.collegeId) {
        console.log('🆔 Processing college ID upload...');
        
        // Create or get college ID folder
        var idFolderName = 'College ID Uploads';
        var idFolder;
        var folders = DriveApp.getFoldersByName(idFolderName);
        if (folders.hasNext()) {
          idFolder = folders.next();
        } else {
          idFolder = DriveApp.createFolder(idFolderName);
          console.log('📁 Created folder:', idFolderName);
        }
        
        // Process base64 file
        var idData = String(formData.collegeId);
        var base64Data = idData.includes(',') ? idData.split(',')[1] : idData;
        
        if (base64Data && base64Data.length > 0) {
          var idBlob = Utilities.newBlob(
            Utilities.base64Decode(base64Data),
            'application/octet-stream',
            'college_id'
          );
          
          var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
          var fileName = `${formData.name || 'student'}_CollegeID_${timestamp}`.replace(/[^a-zA-Z0-9_]/g, '_');
          
          var idFile = idFolder.createFile(idBlob);
          idFile.setName(fileName);
          fileUrl = idFile.getUrl();
          
          console.log('✅ College ID uploaded:', fileName);
        }
      }
    } catch (fileError) {
      console.error('❌ File upload error:', fileError.toString());
      // Continue without file - don't fail the entire submission
    }
    
    // Prepare timestamp
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
    
    // Add data to sheet
    var rowData;
    if (hasRecruitmentFields) {
      console.log('📝 Adding recruitment data...');
      rowData = [
        timestamp,
        formData.name || '',
        formData.email || '',
        formData.contactNo || '',
        formData.branch || '',
        formData.year || '',
        formData.positions || '',
        formData.whyJoin || '',
        formData.pastExperience || '',
        fileUrl
      ];
    } else {
      console.log('📝 Adding registration data...');
      rowData = [
        timestamp,
        formData.name || '',
        formData.email || '',
        formData.phone || '',
        formData.graduationYear || '',
        formData.businessIdea || '',
        formData.funding || '',
        formData.progress || '',
        fileUrl
      ];
    }
    
    console.log('📊 Row data to append:', rowData);
    sheet.appendRow(rowData);
    console.log('✅ Data successfully added to sheet');
    
    var response = {
      status: 'success',
      message: `${hasRecruitmentFields ? 'Recruitment' : 'Registration'} form submitted successfully!`,
      data: {
        formType: hasRecruitmentFields ? 'recruitment' : 'registration',
        sheetName: sheetName,
        spreadsheetId: spreadsheetId,
        spreadsheetName: ss.getName(),
        timestamp: timestamp,
        hasFile: !!fileUrl,
        fileUrl: fileUrl || null
      }
    };
    
    console.log('✅ Success response:', JSON.stringify(response, null, 2));
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error in doPost:', error.toString());
    console.error('❌ Error stack:', error.stack);
    
    var errorResponse = {
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString(),
      debug: {
        hasParameter: !!e.parameter,
        hasPostData: !!e.postData,
        parameterKeys: e.parameter ? Object.keys(e.parameter) : [],
        postDataType: e.postData ? e.postData.type : null
      }
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    if (lock) {
      lock.releaseLock();
    }
  }
}

function doGet(e) {
  console.log('📨 GET request received');
  
  // Show current configuration status
  const RECRUITMENT_ID = '1ABC123_YOUR_RECRUITMENT_SPREADSHEET_ID_HERE_XYZ789';
  const REGISTRATION_ID = '1ABC123_YOUR_REGISTRATION_SPREADSHEET_ID_HERE_XYZ789';
  
  var configStatus = {
    recruitmentConfigured: !RECRUITMENT_ID.includes('YOUR_') && RECRUITMENT_ID.length > 20,
    registrationConfigured: !REGISTRATION_ID.includes('YOUR_') && REGISTRATION_ID.length > 20
  };
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is running and ready to receive form submissions',
      timestamp: new Date().toISOString(),
      configuration: configStatus,
      instructions: 'Please update the RECRUITMENT_SPREADSHEET_ID and REGISTRATION_SPREADSHEET_ID constants with your actual Google Sheets IDs'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 🧪 Test function - run this to verify your configuration
function testConfiguration() {
  console.log('🧪 Testing configuration...');
  
  // Replace these with your actual IDs for testing
  const RECRUITMENT_ID = '1ABC123_YOUR_RECRUITMENT_SPREADSHEET_ID_HERE_XYZ789';
  const REGISTRATION_ID = '1ABC123_YOUR_REGISTRATION_SPREADSHEET_ID_HERE_XYZ789';
  
  console.log('Recruitment ID:', RECRUITMENT_ID);
  console.log('Registration ID:', REGISTRATION_ID);
  
  var results = {};
  
  // Test recruitment spreadsheet
  try {
    if (RECRUITMENT_ID.includes('YOUR_')) {
      results.recruitment = '❌ Not configured - still contains placeholder text';
    } else {
      var ss = SpreadsheetApp.openById(RECRUITMENT_ID);
      results.recruitment = '✅ Accessible - ' + ss.getName();
    }
  } catch (e) {
    results.recruitment = '❌ Error: ' + e.message;
  }
  
  // Test registration spreadsheet  
  try {
    if (REGISTRATION_ID.includes('YOUR_')) {
      results.registration = '❌ Not configured - still contains placeholder text';
    } else {
      var ss = SpreadsheetApp.openById(REGISTRATION_ID);
      results.registration = '✅ Accessible - ' + ss.getName();
    }
  } catch (e) {
    results.registration = '❌ Error: ' + e.message;
  }
  
  console.log('Test results:', JSON.stringify(results, null, 2));
  return results;
}