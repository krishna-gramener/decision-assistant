import { gemini_url, token } from './api-config.js';

// Store extracted data from files
export let extractedData = {
  pdfs: [],
  excel: [],
  csv: [],
  docx: [],
};

// Store sheet data
export let sheetData = [];

// Function to extract text from PDF using Gemini
export async function extractPdfData(fileData, fileInfo) {
  try {
    const base64Data = arrayBufferToBase64(fileData);
    const response = await fetch(gemini_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Extract and return only the text content from this PDF file.",
              },
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64Data,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to extract PDF text: ${response.statusText}`);
    }

    const result = await response.json();
    const pdfText = result.candidates[0].content.parts[0].text;
    extractedData.pdfs.push({ fileName: fileInfo.name, content: pdfText });
    return pdfText;
  } catch (error) {
    console.error("Error extracting PDF:", error);
    throw new Error(`Failed to extract PDF data: ${error.message}`);
  }
}

// Function to extract data from Excel files
export async function extractExcelData(fileData, fileInfo) {
  try {
    const workbook = XLSX.read(new Uint8Array(fileData), { type: "array" });
    const fileSheets = [];
    
    workbook.SheetNames.forEach((sheetName) => {
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
        raw: false,
        defval: ''
      });
      
      // Filter out empty rows
      const cleanData = jsonData.filter(row => row.some(cell => cell !== ''));
      
      if (cleanData.length > 0) {
        // Get headers from first row
        const headers = cleanData[0];
        
        // Convert remaining rows to objects using headers
        const structuredData = cleanData.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            if (row[index] !== '') {
              obj[header] = row[index];
            }
          });
          return obj;
        });
        
        fileSheets.push({
          sheetName,
          headers,
          data: structuredData
        });
      }
    });
    
    if (fileSheets.length > 0) {
      sheetData.push({ fileName: fileInfo.name, sheets: fileSheets });
      extractedData.excel.push({ fileName: fileInfo.name, content: fileSheets });
    }
    return fileSheets;
  } catch (error) {
    console.error("Error extracting Excel:", error);
    throw new Error(`Failed to extract Excel data: ${error.message}`);
  }
}

// Function to extract data from CSV files
export async function extractCsvData(fileData, fileInfo) {
  try {
    const workbook = XLSX.read(new Uint8Array(fileData), { type: "array" });
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      header: 1,
      raw: false,
      defval: ''
    });

    // Filter out empty rows
    const cleanData = jsonData.filter(row => row.some(cell => cell !== ''));
    
    if (cleanData.length > 0) {
      // Get headers from first row
      const headers = cleanData[0];
      
      // Convert remaining rows to objects using headers
      const structuredData = cleanData.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          if (row[index] !== '') {
            obj[header] = row[index];
          }
        });
        return obj;
      });
      
      const sheet = {
        sheetName: 'Sheet1',
        headers,
        data: structuredData
      };
      
      sheetData.push({ fileName: fileInfo.name, sheets: [sheet] });
      extractedData.csv.push({ fileName: fileInfo.name, content: [sheet] });
      return [sheet];
    }
    return [];
  } catch (error) {
    console.error("Error extracting CSV:", error);
    throw new Error(`Failed to extract CSV data: ${error.message}`);
  }
}

// Function to extract data from DOCX files
export async function extractDocxData(fileData, fileInfo) {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: fileData });
    const docxText = result.value;
    extractedData.docx.push({ fileName: fileInfo.name, content: docxText });
    return docxText;
  } catch (error) {
    console.error("Error extracting DOCX:", error);
    throw new Error(`Failed to extract DOCX data: ${error.message}`);
  }
}

// Helper function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
