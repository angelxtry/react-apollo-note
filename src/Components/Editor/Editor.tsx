import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;

interface Prop {
  exTitle?: string;
  exContent?: string;
  exId?: number | null;
  onSave: (title: string, content: string, id: number | null) => Promise<void>;
}

const Editor: React.FC<Prop> = ({
  exTitle = '',
  exContent = '',
  exId = null,
  onSave,
}) => {
  const [title, setTitle] = useState(exTitle);
  const [content, setContent] = useState(exContent);

  const onInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'content') {
      setContent(value);
    }
  };

  const onClickSave: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    const noteId = exId || null;
    onSave(title, content, noteId);
  }, [title, content, exId, onSave]);

  return (
    <>
      <TitleContainer>
        <TitleInput
          value={title}
          onChange={onInputChange}
          placeholder="Untitled..."
          name="title"
        />
        <Button onClick={onClickSave}>Save</Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={onInputChange}
          placeholder="# This supports markdown!"
          name="content"
        />
        <ReactMarkdown source={content} className="markdown" />
      </ContentPreview>
    </>
  );
};

Editor.propTypes = {
  exTitle: PropTypes.string,
  exContent: PropTypes.string,
  exId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  onSave: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  exTitle: '',
  exContent: '',
  exId: null,
};

export default Editor;
