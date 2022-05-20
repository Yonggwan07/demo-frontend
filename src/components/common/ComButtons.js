import Button from './Button';
import styled from 'styled-components';

const ComButtonsBox = styled.div`
  display: flex;;
  justify-content: flex-end;
  margin: 1rem 0 1rem 1rem;
  button + button {
    margin-left: 0.2rem;
  }
`;

const ComButtons = ({ search, insert, save }) => (
  <ComButtonsBox>
    {search && (
      <Button type="submit" form="searchArea">
        조회
      </Button>
    )}
    {insert && <Button onClick={insert}>신규</Button>}
    {save && (
      <Button type="submit" onClick={save}>
        저장
      </Button>
    )}
  </ComButtonsBox>
);

export default ComButtons;
