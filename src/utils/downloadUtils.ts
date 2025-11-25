/**
 * Download utility functions for medical records
 */

interface Attachment {
  type: string;
  name: string;
  url: string;
  uploadDate?: Date;
}

interface MedicalRecord {
  id: number | string;
  type: string;
  recordType?: string;
  doctor: string;
  date: string;
  category: string;
  diagnosis?: string;
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  description?: string;
  attachments?: Attachment[];
}

/**
 * Download a file from a URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Download an attachment (X-ray, prescription, etc.)
 */
export const downloadAttachment = (attachment: Attachment): void => {
  const filename = attachment.name || `${attachment.type}_${Date.now()}`;
  downloadFile(attachment.url, filename);
};

/**
 * Generate and download a PDF for a medical record
 * Uses the browser's print functionality to create a PDF
 */
export const generateMedicalRecordPDF = (record: MedicalRecord): void => {
  // Create a new window with the medical record content
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('Please allow popups to download the medical record PDF');
    return;
  }

  // Format medications list
  const medicationsHTML = record.medications
    ? `
      <div style="margin-top: 20px;">
        <h3 style="color: #0891b2; margin-bottom: 10px;">Prescribed Medications:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Medication</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Dosage</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Frequency</th>
            </tr>
          </thead>
          <tbody>
            ${record.medications.map(med => `
              <tr>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${med.name}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${med.dosage}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${med.frequency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
    : '';

  // Create HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Medical Record - ${record.type}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #1e293b;
          line-height: 1.6;
        }
        .header {
          border-bottom: 3px solid #0891b2;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #0891b2;
          margin: 0 0 10px 0;
        }
        .header p {
          margin: 5px 0;
          color: #64748b;
        }
        .section {
          margin: 20px 0;
        }
        .section h3 {
          color: #0891b2;
          margin-bottom: 10px;
        }
        .info-row {
          display: flex;
          margin: 10px 0;
        }
        .label {
          font-weight: bold;
          width: 150px;
          color: #475569;
        }
        .value {
          flex: 1;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #cbd5e1;
          color: #64748b;
          font-size: 12px;
          text-align: center;
        }
        @media print {
          body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Medora Healthcare</h1>
        <p style="font-size: 18px; font-weight: bold;">Medical Record</p>
      </div>

      <div class="section">
        <div class="info-row">
          <div class="label">Record Type:</div>
          <div class="value">${record.type || record.recordType || 'Medical Record'}</div>
        </div>
        <div class="info-row">
          <div class="label">Category:</div>
          <div class="value">${record.category}</div>
        </div>
        <div class="info-row">
          <div class="label">Doctor:</div>
          <div class="value">${record.doctor}</div>
        </div>
        <div class="info-row">
          <div class="label">Date:</div>
          <div class="value">${record.date}</div>
        </div>
      </div>

      ${record.diagnosis ? `
        <div class="section">
          <h3>Diagnosis:</h3>
          <p>${record.diagnosis}</p>
        </div>
      ` : ''}

      ${medicationsHTML}

      ${record.description ? `
        <div class="section">
          <h3>Notes:</h3>
          <p>${record.description}</p>
        </div>
      ` : ''}

      <div class="footer">
        <p>This is a digital copy of your medical record from Medora Healthcare</p>
        <p>Generated on ${new Date().toLocaleString()}</p>
        <p style="margin-top: 10px;">🔒 Blockchain Secured - Your records are encrypted and protected</p>
      </div>
    </body>
    </html>
  `;

  // Write content to the new window
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load, then trigger print dialog
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (user can cancel)
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 250);
  };
};

/**
 * Download medical record based on type
 * If it has attachments, download the attachment
 * Otherwise, generate a PDF
 */
export const downloadMedicalRecord = (record: MedicalRecord): void => {
  // If record has attachments, download the first attachment
  if (record.attachments && record.attachments.length > 0) {
    downloadAttachment(record.attachments[0]);
  } else {
    // Generate PDF for records without attachments
    generateMedicalRecordPDF(record);
  }
};
