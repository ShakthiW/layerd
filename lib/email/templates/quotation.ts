interface QuotationData {
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  creationData: {
    method: string;
    description: string;
    dimensions: string;
    notes: string;
    material: string;
    finish: string;
    quantity: number;
    fileAttached: boolean;
    imageAttached: boolean;
  };
  pricingData: {
    weightGrams: number;
    printTimeHours: number;
  };
  fileUrl?: string | null;
}

export const getQuotationTemplate = (data: QuotationData) => {
  const fileSection = data.fileUrl
    ? `
    <h3>Attached File</h3>
    <p><a href="${data.fileUrl}" target="_blank" style="color:#d4a853;text-decoration:underline;">View / Download Attached File</a></p>
    `
    : "";

  return `
    <h2>New Custom Quote Request</h2>
    
    <h3>Customer Details</h3>
    <ul>
      <li><strong>Name:</strong> ${data.customerDetails.name}</li>
      <li><strong>Email:</strong> ${data.customerDetails.email}</li>
      <li><strong>Phone:</strong> ${data.customerDetails.phone}</li>
    </ul>

    <h3>Creation Preferences</h3>
    <ul>
      <li><strong>Method:</strong> ${data.creationData.method}</li>
      <li><strong>Material:</strong> ${data.creationData.material}</li>
      <li><strong>Finish:</strong> ${data.creationData.finish}</li>
      <li><strong>Quantity:</strong> ${data.creationData.quantity}</li>
      <li><strong>Dimensions:</strong> ${data.creationData.dimensions || "N/A"}</li>
      <li><strong>File Uploaded:</strong> ${data.creationData.fileAttached ? "Yes" : "No"}</li>
      <li><strong>Image Uploaded:</strong> ${data.creationData.imageAttached ? "Yes" : "No"}</li>
    </ul>

    <h3>Description</h3>
    <p>${data.creationData.description || "N/A"}</p>
    
    <h3>Notes</h3>
    <p>${data.creationData.notes || "N/A"}</p>

    ${fileSection}

    <h3>Estimated Specifications (from calculator)</h3>
    <ul>
      <li><strong>Est. Weight:</strong> ${data.pricingData.weightGrams}g</li>
      <li><strong>Est. Print Time:</strong> ${data.pricingData.printTimeHours} hrs</li>
    </ul>
    
    <p><small>This email was generated automatically from the Layerd Custom Quote form.</small></p>
  `;
};
