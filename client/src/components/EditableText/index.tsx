// Packages
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import useOnclickOutside from "react-cool-onclickoutside";

// Project
import './styles.scss';

interface IProps {
  text: string,
  textClassName?: string,
  inputClassName?: string,
  onSuccess(value, callback): void,
  onCancel?(): void,
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p',
};

const EditableText = ({
  text,
  tag,
  textClassName,
  inputClassName,
  onSuccess,
  onCancel,
  ...rest
}: IProps): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();
  const [editing, setEditing] = useState(false);

  const handleSubmitSuccess = ({ newValue }) => {
    onSuccess(newValue, () => {
      setEditing(false);
    });
  };

  const cancel = () => {
    setEditing(false);
    if (onCancel) {
      onCancel();
    }
  };

  const clickOutsideRef = useOnclickOutside(cancel);

  return (
    <div {...rest} ref={clickOutsideRef} className="editable-text" onClick={() => setEditing(true)}>
      {!editing
        ? React.createElement(tag, { className: cn("editable-text__title", textClassName) }, (
          <>
            {text} <i className="fas fa-pencil-alt editable-text__icon"></i>
          </>
        ))
        : (
          <form onSubmit={handleSubmit(handleSubmitSuccess)} role="form">
            <input
              type="text"
              role="textbox"
              name="newValue"
              className={cn(inputClassName)}
              ref={register({ required: "Required" })}
              defaultValue={text}
            />
          </form>
        )
      }
    </div>
  )
}

export default EditableText;