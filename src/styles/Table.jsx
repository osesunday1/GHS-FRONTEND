import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  max-width: 90%;
  margin: 20px auto;
  text-align: left;
  border-radius: 20px;

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