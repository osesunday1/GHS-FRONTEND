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
    th:nth-child(n+4),
    td:nth-child(n+4) {
      display: none;
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