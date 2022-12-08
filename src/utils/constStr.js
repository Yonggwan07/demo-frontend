export const constStr = {
  postSearch: (count) => `${count}건이 조회되었습니다.`,
  errorSearch: '조회에 실패했습니다.',
  postSave: (count) => `${count}건이 저장되었습니다.`,
  errorSave: '저장에 실패했습니다.',
  postDelete: (count) => `${count}건이 삭제되었습니다.`,
  errorDelete: '삭제에 실패했습니다.',
  required: '필수 입력',
  maxLength: (length) => ({
    value: length,
    message: `${length}자 이하 입력`,
  }),
  minLength: (length) => ({ value: length, message: `${length}자 이상 입력` }),
};
