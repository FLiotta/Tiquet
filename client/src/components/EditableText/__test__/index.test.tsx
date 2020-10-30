// Packages
import * as React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';

// Project
import EditableText from '../index';


describe('<EditableText />', () => {
  it('Matches snapshot', () => {
    const { container } = render(
      <EditableText
        text="test text"
        tag="p"
        onSuccess={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('Receives text', () => {
    const testText = 'testText';

    const { container } = render(
      <EditableText
        text={testText}
        tag='p'
        onSuccess={jest.fn()}
      />
    );

    expect(container.firstChild).toHaveTextContent(testText);
  });

  it('Receives tag', () => {
    const testTag = 'p';

    const { container } = render(
      <EditableText
        text='testText'
        tag={testTag}
        onSuccess={jest.fn()}
      />
    );

    expect(container.firstChild.firstChild.nodeName.toLowerCase()).toBe(testTag);
  });

  it('Editable mode', () => {
    const { container } = render(
      <EditableText
        text='testText'
        tag='p'
        onSuccess={jest.fn()}
      />
    );

    fireEvent.click(container.firstChild);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Input receives classname', () => {
    const inputClassName = 'testClassname';

    const { container } = render(
      <EditableText
        text='testText'
        inputClassName={inputClassName}
        tag='p'
        onSuccess={jest.fn()}
      />
    );

    fireEvent.click(container.firstChild);

    expect(screen.getByRole('textbox')).toHaveClass(inputClassName);
  });

  it('Input receives default text', () => {
    const textValue = 'Some test value';

    const { container } = render(
      <EditableText
        text={textValue}
        tag='p'
        onSuccess={jest.fn()}
      />
    );

    fireEvent.click(container.firstChild);

    expect(screen.getByRole('textbox').getAttribute('value')).toBe(textValue);
  });

  it('onSuccess called', async () => {
    const onSuccess = jest.fn();

    const { container } = render(
      <EditableText
        text='testtext'
        tag='p'
        onSuccess={onSuccess}
      />
    );

    fireEvent.click(container.firstChild);
    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    expect(onSuccess).toBeCalledTimes(1);
  });
});