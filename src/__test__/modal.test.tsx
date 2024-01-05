import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  badgeTestId,
  firstTriggerBtn,
  modalInputLabel,
  modalInputPlaceHolder,
} from 'constants/modalTest';
import { TokenListKeyType, tokenList } from 'constants/tokenList';
import { MainPage } from 'pages/main';
import { mockGetQuote } from 'utils/mockGetValue';

describe('modal', () => {
  beforeAll(mockGetQuote);
  beforeEach(() => {
    render(<MainPage />);
  });
  test('trigger button을 클릭했을 때 modal이 띄어져야 한다.', async () => {
    await userEvent.click(screen.getByTestId(firstTriggerBtn));
    await waitFor(() => {
      expect(screen.getByText(modalInputPlaceHolder)).toBeInTheDocument();
    });
  });
  test('AXS로 검색할 시 AXS 심볼만 나와야한다.', async () => {
    const input: TokenListKeyType = 'AXS';
    await userEvent.type(screen.getByLabelText(modalInputLabel), input);
    await waitFor(() => {
      expect(screen.getByText(input)).toBeInTheDocument();
      expect(screen.getByText('WAS', { exact: false })).toBeEmptyDOMElement();
    });
  });
  test('AXS를 클릭할 시 AXS 심볼이 트리거 버튼에 적용되게 되야한다.', async () => {
    const symbolText: TokenListKeyType = 'AXS';
    await userEvent.click(screen.getByTestId(firstTriggerBtn));
    await waitFor(async () => {
      await userEvent.click(screen.getByText(symbolText));
      await waitFor(() => {
        expect(screen.getByTestId(firstTriggerBtn)).toHaveTextContent(
          symbolText,
        );
      });
    });
  });

  test('최근에 클릭된 심볼은 저장되야 한다.', async () => {
    const symbolText: TokenListKeyType = 'AXS';
    await userEvent.click(screen.getByTestId(firstTriggerBtn));
    await waitFor(async () => {
      await userEvent.click(screen.getByText(symbolText));
      await waitFor(async () => {
        await userEvent.click(screen.getByTestId(firstTriggerBtn));
        await waitFor(() => {
          expect(screen.getAllByText(symbolText).length).toBeGreaterThanOrEqual(
            2,
          );
        });
      });
    });
  });

  test('최대 7개까지 최근 선택한 심볼을 저장할 수 있어야 한다.', async () => {
    const tokenIterable = Object.keys(tokenList);
    const sevenFromTheBackToken = tokenIterable.slice(-7);
    const threeFromTheFrontToken = tokenIterable.slice(0, 3);
    for (const token of tokenIterable) {
      await userEvent.click(screen.getByTestId(firstTriggerBtn));
      await waitFor(async () => {
        await userEvent.click(screen.getByText(token));
      });
    }
    await userEvent.click(screen.getByTestId(firstTriggerBtn));
    await waitFor(() => {
      const getAllByBadge = screen.getAllByTestId(badgeTestId);
      for (const badge of getAllByBadge) {
        expect(
          sevenFromTheBackToken.includes(badge.textContent as string),
        ).toBe(true);
        expect(
          threeFromTheFrontToken.includes(badge.textContent as string),
        ).toBe(false);
      }
    });
  });
});
