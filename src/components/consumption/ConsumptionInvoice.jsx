import jsPDF from 'jspdf';
import styled from 'styled-components';



const InvoiceContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  font-family: Arial, sans-serif;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  text-align: right;
`;

const InvoiceTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const SubTitle = styled.div`
  font-size: 14px;
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailColumn = styled.div`
  width: 48%;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const TotalColumn = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const ConsumptionInvoice = ({ consumption }) => {

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
    
        // Set font and color styles
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text('GHS APARTMENTS', 14, 22); // Logo placeholder
        doc.text('INVOICE', 180, 22, null, null, 'right');
    
        // Guest details
        doc.setFontSize(12);
        doc.text(`Guest Name: ${consumption.guestId.firstName} ${consumption.guestId.lastName}`, 14, 40);
        doc.text(`Date: ${new Date(consumption.createdAt).toLocaleDateString()}`, 14, 50);
        doc.text(`Amount Due (NGN): #${consumption.totalAmount.toLocaleString()}`, 180, 50, null, null, 'right');
        
        // Billing Information
        doc.text('BILL TO:', 14, 70);
        doc.text(`${consumption.guestId.firstName} ${consumption.guestId.lastName}`, 14, 80);
        doc.text(`Payment Due: ${new Date(consumption.createdAt).toLocaleDateString()}`, 14, 90);
    
        // Table Header
        doc.setFontSize(12);
        doc.setFillColor(230, 230, 230);
        doc.rect(14, 100, 182, 10, 'F');
        doc.setTextColor(0);
        doc.text('Item', 14, 106);
        doc.text('Quantity', 80, 106);
        doc.text('Price', 120, 106);
        doc.text('Amount', 160, 106);
    
        // List Items
        let currentYPosition = 116;
        consumption.items.forEach(item => {
          doc.text(item.inventoryItemId.item, 14, currentYPosition);
          doc.text(item.quantity.toString(), 80, currentYPosition);
          doc.text(`#${item.inventoryItemId.price.toLocaleString()}`, 120, currentYPosition);
          doc.text(`#${item.amount.toLocaleString()}`, 160, currentYPosition);
          currentYPosition += 10; // Move down for the next item
        });
    
        // Total Amount
        doc.setFontSize(14);
        doc.text('Total:', 120, currentYPosition + 10);
        doc.text(`#${consumption.totalAmount.toLocaleString()}`, 160, currentYPosition + 10);
    
        // Footer (Download button)
        doc.save(`Invoice_${consumption.guestId.firstName}_${consumption.guestId.lastName}.pdf`);
    };

  return (
    <InvoiceContainer>
        <Header>
        <img src="../../logo2.png" alt="GHS Apartments Logo" style={{ height: '50px' }} />
        <Title>
          <InvoiceTitle>INVOICE</InvoiceTitle>
          <SubTitle>GHS APARTMENTS</SubTitle>
        </Title>
        </Header>

    <DetailsRow>
            <DetailColumn>
            <p>
            <strong>BILL TO:</strong> {consumption.guestId.firstName} {consumption.guestId.lastName}
            </p>
            <p><strong>Date:</strong> {new Date(consumption.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Due:</strong> {new Date(consumption.createdAt).toLocaleDateString()}</p>
            </DetailColumn>
            <DetailColumn style={{ textAlign: 'right' }}>
            <p><strong>Amount Due (NGN):</strong> #{consumption.totalAmount.toLocaleString()}</p>
            </DetailColumn>
    </DetailsRow>

    <ItemsTable>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {consumption.items.map((item) => (
            <tr key={item.inventoryItemId._id}>
              <td>{item.inventoryItemId.item}</td>
              <td>{item.quantity}</td>
              <td>#{item.inventoryItemId.price.toLocaleString()}</td>
              <td>#{item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
    </ItemsTable>
      
    <TotalSection>
        <TotalColumn>
        <TotalRow>
            <strong>Total:</strong>
            <span>#{consumption.totalAmount.toLocaleString()}</span>
        <TotalRow>
            <strong>Amount Due (NGN):</strong>
            <span>#{consumption.totalAmount.toLocaleString()}</span>
        </TotalRow>
        </TotalRow>
       </TotalColumn>
    </TotalSection>




      <button onClick={handleDownloadInvoice}>Download Invoice as PDF</button>
   
    </InvoiceContainer>
  );
};

export default ConsumptionInvoice;