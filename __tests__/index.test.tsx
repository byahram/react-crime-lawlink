// __tests__/index.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page"; // 경로는 프로젝트에 맞게

describe("Home page", () => {
  it("shows Next.js logo and docs link", () => {
    render(<Home />);

    // 로고 이미지
    expect(screen.getByAltText(/next\.js logo/i)).toBeInTheDocument();

    // 문서 링크 버튼
    expect(
      screen.getByRole("link", { name: /read our docs/i })
    ).toBeInTheDocument();

    // 템플릿 문구
    expect(screen.getByText(/get started by editing/i)).toBeInTheDocument();
  });
});
