import styled from 'styled-components';

const WorkframeBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: calc(100% - 5.25rem); // header height
`;

const ComWorkframe = ({ children }) => <WorkframeBox>{children}</WorkframeBox>;

export default ComWorkframe;
