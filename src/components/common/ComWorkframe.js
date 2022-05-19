import styled from 'styled-components';

const WorkframeBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const ComWorkframe = ({ children }) => <WorkframeBox>{children}</WorkframeBox>;

export default ComWorkframe;
