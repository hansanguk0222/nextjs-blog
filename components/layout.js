import styled from "styled-components";

const Box = styled.div`
  border: 1px solid green;
`;

const Layout = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Layout;
