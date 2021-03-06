'use strict';

(() => {
  const HASTAG_MAX_LENGTH = 20;
  const HASTAG_MAX_NUMBER = 5;
  const REGULAR_EXPRESSION = /^[\w]*$/;

  const textHashtags = window.uploadModal.uploadModal.querySelector(`.text__hashtags`);

  const validateTextHashtags = () => {
    const textHashtagsParsed = textHashtags.value.trim().split(` `);
    let customValidityMessage = ``;
    let isSameHashtagFound = false;

    for (let i = 0; i < textHashtagsParsed.length; i++) {
      if (textHashtagsParsed[i].startsWith(`#`) && textHashtagsParsed[i].length === 1) {
        customValidityMessage += `Хеш-тег не может состоять из одного октоторпа. `;
      }

      if (!textHashtagsParsed[i].startsWith(`#`) && REGULAR_EXPRESSION.test(textHashtagsParsed[i]) && textHashtagsParsed[i].length > 0) {
        customValidityMessage += `Хеш-тег “${textHashtagsParsed[i]}” должен предваряться октоторпом. `;
      }

      if (textHashtagsParsed[i].length > HASTAG_MAX_LENGTH) {
        customValidityMessage += `Хеш-тег “${textHashtagsParsed[i]}” должен быть короче 20 символов. Удалите лишние ${textHashtagsParsed[i].length - HASTAG_MAX_LENGTH} симв. `;
      }

      if (!textHashtagsParsed[i].startsWith(`#`) && !REGULAR_EXPRESSION.test(textHashtagsParsed[i])) {
        customValidityMessage += `Нельзя использовать спецсимволы (#, @, $ и т. п.), за исключением октоторпа в начале хеш-тега, символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. `;
      }

      if (textHashtagsParsed[i].startsWith(`#`) && textHashtagsParsed[i].length > 1 && !REGULAR_EXPRESSION.test(textHashtagsParsed[i].substring(1))) {
        customValidityMessage += `После октоторпа не должны стоять спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. `;
      }

      if (!isSameHashtagFound) {
        for (let j = 0; j < textHashtagsParsed.length; j++) {
          if (textHashtagsParsed[i].toLowerCase() === textHashtagsParsed[j].toLowerCase() && textHashtagsParsed[i].length > 0 && j !== i) {
            customValidityMessage += `Хеш-теги не должны повторяться. `;
            isSameHashtagFound = true;
          }
        }
      }
    }

    if (textHashtagsParsed.length > HASTAG_MAX_NUMBER) {
      customValidityMessage += `Нельзя указывать больше пяти хеш-тегов. `;
    }

    textHashtags.setCustomValidity(customValidityMessage);
    textHashtags.reportValidity();
  };

  const onTextHashtagsInput = () => {
    validateTextHashtags();
  };

  const textDescription = window.uploadModal.uploadModal.querySelector(`.text__description`);

  window.form = {
    textHashtags,
    textDescription,
    onTextHashtagsInput
  };
})();
