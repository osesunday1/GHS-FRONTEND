import jsPDF from 'jspdf';

const ConsumptionInvoice = ({ consumption }) => {
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Consumption Invoice', 14, 22);

    // Add details about the guest
    doc.setFontSize(12);
    doc.text(`Guest Name: ${consumption.guestId.firstName} ${consumption.guestId.lastName}`, 14, 40);
    doc.text(`Date: ${new Date(consumption.createdAt).toLocaleDateString()}`, 14, 50);

    // Add a table header
    doc.text('Items', 14, 70);
    doc.text('Quantity', 80, 70);
    doc.text('Amount', 120, 70);

    // List the items
    let currentYPosition = 80;
    consumption.items.forEach(item => {
      doc.text(item.inventoryItemId.item, 14, currentYPosition);
      doc.text(item.quantity.toString(), 80, currentYPosition);
      doc.text(`#${item.amount.toLocaleString()}`, 120, currentYPosition);
      currentYPosition += 10; // Move down for the next item
    });

    // Total amount
    doc.text('Total:', 120, currentYPosition + 10);
    doc.text(`#${consumption.totalAmount.toLocaleString()}`, 140, currentYPosition + 10);

    // Save the PDF
    doc.save(`Invoice_${consumption.guestId.firstName}_${consumption.guestId.lastName}.pdf`);
  };

  return (
    <div>
      <h3>Consumption Invoice</h3>
      <p>
        Guest Name: {consumption.guestId.firstName} {consumption.guestId.lastName}
      </p>
      <p>Date: {new Date(consumption.createdAt).toLocaleDateString()}</p>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {consumption.items.map((item) => (
            <tr key={item.inventoryItemId._id}>
              <td>{item.inventoryItemId.item}</td>
              <td>{item.quantity}</td>
              <td>#{item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h4>Total Amount: #{consumption.totalAmount.toLocaleString()}</h4>

      <button onClick={handleDownloadInvoice}>Download Invoice as PDF</button>
    </div>
  );
};

export default ConsumptionInvoice;