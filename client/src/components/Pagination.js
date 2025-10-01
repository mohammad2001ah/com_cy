// No additional code is needed at the placeholder for this file.
// The existing code does not use any outdated libraries or APIs mentioned in the prompt.
// Ensure the rest of the project is updated as per the requirements.
import styled from 'styled-components';
import React from 'react';

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
}) {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, i) => i + 1
  );

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PaginationBlock key={number}>
          <a
            data-test-id="pagination-link"
            onClick={() => paginate(number)}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {number}
          </a>
        </PaginationBlock>
      ))}
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.ul`
  display: flex;
  position: absolute;
  bottom: 10px;
  flex-wrap: wrap;
`;

const PaginationBlock = styled.li`
  width: 30px;
  height: 30px;
  background-color: #171e26;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
  cursor: pointer;
`;