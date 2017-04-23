# Angular Translator

**Angular Translator** helps you translating your Angular application.

Translation applications like this one are generally not specialized for a specific framework.

This application prefers to specialize in the translation of Angular applications only, so it can integrate perfectly with the framework.

## How it works
The `ng-xi18n` Angular tool is responsible for extracting from the app sources the terms to translate. This tool creates a `messages.xmb` (or `messages.xlf`) file containing all the necessary information for the human translator to do his job.

**Angular Translator** gets this `messages.xmb` file and uses it at the reference for the terms that have to be translated. It is called the *source file* in the app.

In **Angular Translator**, you then have to declare the different file names where the different translations for specific languages will be stored. When you begin, you do not need to create these translation files, the app will do that for you. They all called the *translations files* in the app.

When you have finished translating for a specific language, you can export the translation file for this language and place it beside your source file in your sources repository. If you decide to work again on the translations for this same language, the translations you have made earlier will be extracted from this translation file.

When you update your app and add or remove terms to translate and regenerate the `messages.xmb` source file with `ng-xi18n`, you do not need to merge the differences to your translation files. Because **Angular Translator** gets the *source file* as the reference, it will handle correclty the terms removed or added.

## Usage

First declare a new project in the application, with `New Project...` in the sidenav. You will have to declare some information for this new project:

- **name**: a name that will appear in the sidenav - be clear and concise,
- **icon**: a name of a Material icon - select one here: https://material.io/icons/,
- **github repo**: the github repository where the app will get the files, for example `Hackbit/angularattack2017-feloy` for translating this app,
- **i18n directory**: the directory inside the repository where source and translations files are placed, `src/i18n`generally,
- **source file name**: the name of the source file, `messages.xmb` or `messages.xlf`generally,
- **translations files names**: the names of the translations files you want to create, one for each language you want to translate your app in - they do not need to exist in the repository.

Once your project created, the app will load the contents of the *source file* and extract the terms to translate.

You then have to choose one language you want to work with, based on the list of files you have declared as translations files, using the select listing the different translations files names.

If the translation file exists in the repository, the app loads it and extracts the translations already done. 

You can now begin to translate the different terms.

When you are done, you can use the `Extract` button on the upper-right corner to extract the translations in the current language in a local file. You can now commit this file in your repository.
