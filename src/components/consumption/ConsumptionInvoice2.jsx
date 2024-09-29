import styled from 'styled-components';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
import base64Logo from './CompLogo'; // Import the base64 encoded image

//pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  width: 300px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const DownloadButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConsumptionInvoice = ({ consumption }) => {
  
  {/* 
  const downloadPDF = () => {
    const pdfContent = [
      {
        columns: [
          {
            image: 'logo',
            width: 100, // Set image width for the PDF
          },
          {
            stack: [
              { text: 'INVOICE', style: 'header' },
              { text: 'GHS APARTMENTS', style: 'subheader' },
            ],
            alignment: 'right',
          },
        ],
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          {
            stack: [
              { text: `BILL TO: ${consumption.guestId.firstName} ${consumption.guestId.lastName}`, bold: true, margin: [0, 0, 20, 20] },
              { text: `Invoice Number: ${consumption._id}` },
              { text: `Invoice Date: ${new Date(consumption.createdAt).toLocaleDateString()}` },
              { text: `Payment Due: ${new Date(consumption.createdAt).toLocaleDateString()}` },
            ],
          },
          {
            text: `Amount Due (NGN): #${consumption.totalAmount.toLocaleString()}`,
            alignment: 'right',
          },
        ],
        margin: [0, 60, 0, 0]
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Items', 'Quantity', 'Price', 'Amount'],
            ...consumption.items.map(item => [
              item.inventoryItemId.item,
              item.quantity,
              `#${item.inventoryItemId.price.toLocaleString()}`,
              `#${item.amount.toLocaleString()}`,
            ])
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 60, 0, 0]
      },
      {
        columns: [
          { text: '' },
          {
            stack: [
              { text: `Total: #${consumption.totalAmount.toLocaleString()}` },
              { text: `Amount Due (NGN): #${consumption.totalAmount.toLocaleString()}` },
            ],
            width: 'auto',
            alignment: 'right',
          }
        ],
        margin: [0, 80, 0, 20]
      }
    ];

    const documentDefinition = {
      content: pdfContent,
      images: {
        logo: base64Logo,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
        footer: {
          fontSize: 15,
          margin: [40, 0, 40, 0], // Adds margin to the footer text
          bold:true
        }
      },
      footer: {
        columns: [
          {
            text: '1852987806 | Access Bank | Grace House Service Apartment Ltd',
            alignment: 'center',
            style: 'footer'
          }
        ],
        margin: [0, 10, 0, 0] // Margin to position footer correctly
      },
      pageMargins: [40, 60, 40, 60] // Adjust page margins as needed
    };
    
    pdfMake.createPdf(documentDefinition).download(`invoice-${consumption._id}.pdf`);
  };
*/}
  return (
    <InvoiceContainer id="invoice">
      <Header>
        <img src={base64Logo} alt="GHS Apartments Logo" style={{ height: '50px' }} />
        <Title>
          <InvoiceTitle>INVOICE</InvoiceTitle>
          <SubTitle>GHS APARTMENTS</SubTitle>
        </Title>
      </Header>

      <DetailsRow>
        <DetailColumn>
          <p><strong>BILL TO:</strong> {consumption.guestId.firstName} {consumption.guestId.lastName}</p>
          <p><strong>Invoice Number:</strong> {consumption._id}</p>
          <p><strong>Invoice Date:</strong> {new Date(consumption.createdAt).toLocaleDateString()}</p>
          <p><strong>Payment Due:</strong> {new Date(consumption.createdAt).toLocaleDateString()}</p>
        </DetailColumn>
        <DetailColumn style={{ textAlign: 'right' }}>
          <p><strong>Amount Due (NGN):</strong> #{consumption.totalAmount.toLocaleString()}</p>
        </DetailColumn>
      </DetailsRow>

      <ItemsTable>
        <thead>
          <tr>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {consumption.items.map((item, index) => (
            <tr key={index}>
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
          </TotalRow>
          <TotalRow>
            <strong>Amount Due (NGN):</strong>
            <span>#{consumption.totalAmount.toLocaleString()}</span>
          </TotalRow>
        </TotalColumn>
      </TotalSection>

      <DownloadButton >Download PDF</DownloadButton>
    </InvoiceContainer>
  );
};

export default ConsumptionInvoice;