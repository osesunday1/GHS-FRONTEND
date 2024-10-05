import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  max-width: 90%;
  margin: 20px auto;
  text-align: left;
  border: 1px solid var(--blue);
  

  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    
  }

  th {
    background-color: var(--blue);
    color: var(--white);
  }

  tr{
    background-color: var(--white);
    color: var(--darkgrey);
  }

  tr:hover {
    background-color: #f1f1f1;
  }

   /* Media query for phone view */
   @media (max-width: 768px) {
    /* Hide all columns except the first name, check-in date, and check-out date */
    th:nth-child(n+4):not(:last-child),
    td:nth-child(n+4):not(:last-child) {
      display: none;
    }

    width: 90%; /* Adjust width for mobile view */
    max-width: 100%; /* Ensure it doesn't exceed the screen width */
    margin: 10px auto; /* Reduce margin for mobile */

    th, td {
      padding: 6px; /* Reduce padding on mobile */
    }

  }
`;

const Table = ({ headers, data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, idx) => (
              <td key={idx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;