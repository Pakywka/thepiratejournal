import { useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const TitleField = () => {
  const { setTitle } = useActions();
  const { title } = useTypedSelector((state) => state.editorPage.data);
  const [inputValue, setInputValue] = useState(title);

  return (
    <div>
      <h4 className="confirmDialogItemLabel">
        Название статьи <span>(обязательно)</span>
      </h4>
      <div className="inputWrapper">
        <input
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
            setTitle(e.currentTarget.value);
          }}
          value={inputValue}
          maxLength={203}
          placeholder="Добавь название статьи"
        />
      </div>
    </div>
  );
};

export default TitleField;