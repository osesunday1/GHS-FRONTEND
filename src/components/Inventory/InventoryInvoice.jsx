import jsPDF from 'jspdf';
import styled from 'styled-components';
import { imgData} from './imgData';

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

const InventoryInvoice = ({ inventory }) => {

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
    
        // Set font and color styles
        doc.setFontSize(18);
        doc.setTextColor(40);
        // Add the logo (make sure it's Base64 or local file)
        const imgD = imgData;  // Base64 string or require/import path
        doc.addImage(imgD, 'PNG', 14, 10, 50, 35); // x, y, width, height
        doc.text('INVOICE', 180, 22, null, null, 'right');

        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(12);
        doc.text(`Guest Name: ${inventory.guestId.firstName} ${inventory.guestId.lastName}`, 14, 71);
        // Guest details
        doc.setFont('helvetica', 'regular');
        doc.setFontSize(12);
        doc.text(`Date: ${new Date(inventory.createdAt).toLocaleDateString()}`, 14, 78);
        doc.text(`Amount Due (NGN): #${inventory.totalAmount.toLocaleString() || 'N/A'}`, 180, 71, null, null, 'right');
        
        // Billing Information
        
        doc.text(`Payment Due: ${new Date(inventory.createdAt).toLocaleDateString()}`, 14, 85);
    
        // Table Header
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(12);
        doc.setFillColor(37, 150, 190);
        doc.rect(14, 100, 182, 10, 'F');
        doc.setTextColor(0);
        doc.text('Item', 19, 106);
        doc.text('Quantity', 80, 106);
        doc.text('Price', 120, 106);
        doc.text('Amount', 160, 106);
    
        // List Items
        doc.setFont('helvetica', 'regular');
        let currentYPosition = 116;
        inventory.items.forEach(item => {
          doc.text(item.productItemId.item, 14, currentYPosition);
          doc.text(item.quantity.toString(), 87, currentYPosition);
          doc.text(`#${item.productItemId.price.toLocaleString() || 'N/A'}`, 120, currentYPosition);
          doc.text(`#${item.amount.toLocaleString() || 'N/A'}`, 160, currentYPosition);
          currentYPosition += 10; // Move down for the next item
        });
    
        // Total Amount
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(13);
        doc.text('Total:', 120, currentYPosition + 3);
        doc.text(`#${inventory.totalAmount.toLocaleString() || 'N/A'}`, 160, currentYPosition + 3);


        // Add footer with account details
        doc.setFontSize(12); // Smaller font size for footer
        doc.text('Account Number: 1852987806', 80, 282); // Set y-value close to the bottom (A4 page height is 297)
        doc.text('AccessBank - Grace House Service Apartment Ltd', 61, 290); // Another line slightly below
    
        // Footer (Download button)
        doc.save(`Invoice_${inventory.guestId.firstName}_${inventory.guestId.lastName}.pdf`);
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
            <strong>BILL TO:</strong> {inventory.guestId.firstName} {inventory.guestId.lastName}
            </p>
            <p><strong>Date:</strong> {new Date(inventory.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Due:</strong> {new Date(inventory.createdAt).toLocaleDateString() || 'N/A'}</p>
            </DetailColumn>
            <DetailColumn style={{ textAlign: 'right' }}>
            <p><strong>Amount Due (NGN):</strong> #{inventory.totalAmount.toLocaleString() || 'N/A'}</p>
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
  {inventory.items.map((item) => {
    const itemName = item?.productItemId?.item || 'Unknown Item';
    const quantity = item?.quantity || 0;
    const price = item?.productItemId?.price || 0;
    const amount = item?.amount || 0;

    return (
      <tr key={item.productItemId?._id || Math.random()}>
        <td>{itemName}</td>
        <td>{quantity}</td>
        <td>#{price.toLocaleString()}</td>
        <td>#{amount.toLocaleString()}</td>
      </tr>
    );
  })}
</tbody>
    </ItemsTable>
      
    <TotalSection>
        <TotalColumn>
        <TotalRow>
            <strong>Total:</strong>
            <span>#{inventory.totalAmount.toLocaleString() || 'N/A'}</span>
        <TotalRow>
            <strong>Amount Due (NGN):</strong>
            <span>#{inventory.totalAmount.toLocaleString() || 'N/A'}</span>
        </TotalRow>
        </TotalRow>
       </TotalColumn>
    </TotalSection>




      <button onClick={handleDownloadInvoice}>Download Invoice as PDF</button>
   
    </InvoiceContainer>
  );
};

export default InventoryInvoice;