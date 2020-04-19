## Start demonstration
>npm run start
___

## Implementing form
#### EmailsInput(wrapper[, emails])
Argument | Type | Default value
--- | --- | ---
wrapper | HTMLElement | null
emails | Array of strings | []

#### Function EmailsInput return obgect:
Methods | Description 
 --- | --- 
 addRandomMail() | add random email to the list
 getEmailsCount() | shows an alert with valid emails count
 subscribe() | accepts a function that is called during the update, receiving state as an argument
 replaceAllEmails | replace all entered emails with new ones
 getAllAddedEmails | get all entered emails. Both valid and invalid
___

## Example
```dart in html
<div id="emails-input"></div>

<div id="share-control"  class="share__control">
  <button class="button" id="add-email" type="button">Add email</button>
  <button class="button" id="get-emails-count" type="button">Get emails count</button>
</div>
```
```javascript
var inputContainerNode = document.querySelector('#emails-input');
var emailsInput = EmailsInput(inputContainerNode, []);
var control = document.querySelector('#share-control');
control.addEventListener('click', function (event) {
    if (event.target.id === 'add-email') {
        emailsInput.addMail();
    }
    if (event.target.id === 'get-emails-count') {
        emailsInput.getEmailsCount();
    }
})
```
___