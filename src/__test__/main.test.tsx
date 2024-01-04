import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from '../pages/main';
import { wrapper } from '../utils/renderUi';
import {
  disableButtonId,
  firstInputLabel,
  secondInputLabel,
  settingButtonId,
} from '../constants/mainPageTestId';
import userEvent from '@testing-library/user-event';

describe('mainPage', () => {
  beforeEach(() => {
    render(<MainPage />, {
      wrapper: (props) => wrapper(props, { route: '/' }),
    });
  });

  test("input에 수량이 없다면 '금액을 입력하세요'버튼이 보여야하며 비활성화 돼야한다.", () => {
    expect(screen.getByLabelText(firstInputLabel)).toHaveValue('0.0');
    expect(screen.getByLabelText(secondInputLabel)).toHaveValue('0.0');

    expect(screen.getByTestId(disableButtonId)).toHaveTextContent(
      '금액을 입력하세요.',
    );
  });

  test("설정 버튼을 누르면 '준비 중입니다.'라는 alert가 떠야한다.", async () => {
    await userEvent.click(screen.getByTestId(settingButtonId));
    await waitFor(() => {
      expect(screen.getByText('준비 중입니다.'));
    });
  });

  test('input은 소수점 10자리까지 입력할 수 있다.', async () => {
    const input = '10.123123123213231213213';
    await userEvent.type(screen.getByLabelText(firstInputLabel), input);
    await waitFor(() => {
      expect(screen.getByLabelText(firstInputLabel)).toHaveValue(
        '10.1231231232',
      );
    });
  });

  test('첫 번째 input창에 입력 시 두 번째 input에 값이 141.989가 되어야 한다.', async () => {
    const input = '0.1';
    await userEvent.type(screen.getByLabelText(firstInputLabel), input);
    await waitFor(() => {
      expect(screen.getByLabelText(secondInputLabel)).toHaveValue('141.989');
    });
  });

  test('두 번째 input창에 입력 시 첫 번째 input에 값이 141.989가 되어야 한다.', async () => {
    const input = '0.1';
    await userEvent.type(screen.getByLabelText(secondInputLabel), input);
    await waitFor(() => {
      expect(screen.getByLabelText(firstInputLabel)).toHaveValue('141.989');
    });
  });
});
