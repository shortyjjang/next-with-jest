import { memo, useMemo } from "react";
import styled from "styled-components";
// 🔟 CSS 연산 최적화 (styled-components + memoization)

// 요구 사항:
// 	•	styled-components에서 useMemo를 활용하여 backgroundColor 값을 동적으로 계산하되, 불필요한 계산을 방지하세요.

const getBackgroundColor = (value: number) => {
  return `#${value.toString(16).padStart(6, "0")}`;
};

const StyleBox = styled.div<{ value: number }>`
  background-color: ${({ value }) => getBackgroundColor(value)};
`;

export const StyleComponent = ({ value }: { value: number }) => {
  const bgColor = useMemo(() => getBackgroundColor(value), [value]);
  return (
    <StyleBox value={value} style={{ backgroundColor: bgColor }}>
      {value}
    </StyleBox>
  );
};
