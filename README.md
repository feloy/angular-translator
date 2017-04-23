# Angular Translator

**Angular Translator** helps you translating your Angular application.

Translation applications like this one are generally not specialized for a specific framework.

This application prefers to specialize in the translation of Angular applications only, so it can integrate perfectly with the framework.

## How it works
The `ng-xi18n` Angular tool is responsible for extracting from the app sources the terms to translate. This tool creates a `messages.xmb` (or `messages.xlf`) file containing all the necessary information for the human translator to do his job.

**Angular Translator** gets this `messages.xmb` file and uses it at the reference for the terms that have to be translated. It is called the *source file* in the app.

In **Angular Translator**, you then have to declare the different file names where the different translations for specific languages will be stored. When you begin, you do not need to create these translation files, the app will do that for you. They all called the * translations files* in the app.

When you have finished translating for a specific language, you can export the translation file for this language and place it beside your source file in your source repository. If you decide to work again on the translations for this same language, the translations you have made earlier will be extracted from this translation file.

When you update your app and add or remove terms to translate and regenerate the `messages.xmb` source file with `ng-xi18n`, you do not need to merge the differences to your translation files. Because **Angular Translator** get the *source file* as the reference, it will handle correclty the terms removed or added.