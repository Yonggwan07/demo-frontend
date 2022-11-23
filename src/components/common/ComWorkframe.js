import { memo } from 'react';
import styled from 'styled-components';

const WorkframeBox = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 1rem; */
  height: 100%; // header height
`;

const ComWorkframe = ({ children }) => <WorkframeBox>{children}</WorkframeBox>;

export default memo(ComWorkframe);
