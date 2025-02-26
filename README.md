# Saturn
An accessible financial manager. Download the file `Saturn.zip` and then extract it. Run the program by double clicking `Saturn.exe` in the extracted file. Make sure that you extract the zip file, and then run the extracted executable. If you directly run the executable from the zip file, then Saturn might not be able to save the ledger. Windows might say that it is an untrusted or unsafe file because it hasn't seen it before, so just click "Run Anyway". You can view the code by downloading and extracting `SaturnCode.zip`.

People with disabilities can struggle a lot with managing their finances or using financial management software. Especially people with Autism Spectrum Disorder (ASD) or Attention-Deficit Hyperactive Disorder (ADHD), like me, who can have trouble interacting with the complex interfaces and keeping things organized and non-overwhelming. With Saturn, I wanted to prioritize accessibility for all forms of disabilities, but primarily ADHD and ASD. I have intentionally kept the interface clear and simple. I have also ensured to have sufficient contrast between adjacent elements of the interface and designed the HTML structure with screen-readers in mind to aid vision-impaired people.

Saturn automatically saves in the background whenever you make a change. This means that you can close the program at any time, and reopen it later with your changes to the ledger still there. Saturn saves to the file `ledger.json`, which I have pre-loaded with an example ledger for judging. If at any time you wish to discard your changes and return to this example ledger, please click the `Open example ledger` text in the bottom left corner. Note, however, this will permanently discard any changes that you have made.

## Architecture

Saturn was build using Electron, an architecture that runs on Node.js and enables you to use web development techniques and technologies to develop beautiful and dynamic desktop applications. Thanks to Node.js, both my frontend and my backend run on the same language: Typescript (a typed superset of Javascript). This gives seamless integration between the frontend and the backend. Furthermore, because Saturn is built using web technologies, it is incredibly easy to port it into a proper website. In fact, I actually did turn an earlier version of Saturn into a website in a single afternoon for a scholarship.

For the frontend, I employed Vue. Vue is a modern and sleek framework, technologies that augment (or in some cases replace) the traditional HTML/CSS/JS structure with tools that make it easier to build responsive and performant websites. Using Vue, the developer creates many small, composable modules that are combined into gradually more and more complex modules, similar to the way that a developer using a functional paradigm would write small functions that they then combine together to build gradually more complex functions.

I am using Typescript for both the frontend and the backend. This is an extension of Javascript developed by Microsoft that adds type-checking. This significantly reduces bugs in the program and makes development faster and more efficient. For styling, I am using SCSS, which improves regular CSS and makes it easier to work with and manage.

## Interface

The interface was purposefully designed to be simple, non-overwhelming, and easy to understand. Everywhere you see an account name, you can click the name and be taken to a page showing that account's transactions. Similarly for counterparties. This allows very free and unstructured navigation of ledger data that not only makes interaction faster, but accomodates people that struggle with rigid interaction styles.

It has minimal large-scale movement so as to avoid hurting people with a sensitivity to flashing lights. It also has high contrast between adjacent elements and is optimized for screen-readers to aid vision-impaired people. All adjacent colors have contrast ratios significantly exceeding the requirements of WCAG 2.2's level AAA.

### Recent Transactions

You can view a list of all recent transactions by clicking on the icon shaped like a house. It is also the default page when you open Saturn. The newest transactions are at the top. You can delete a transaction by clicking on the trash icon to the right of it, and you can edit a transaction by clicking on the pencil icon. To add a transaction, click the plus icon to the left at the bottom of the list. By clicking the download button to the right at the bottom of the list, you can export a Comma-Separated Value (CSV) copy of the transactions.

### Accounts

You can view a list of the accounts by clicking on the icon shaped like a bank. Similar to the recent transactions page, you can click the pencil icon to the right of an account to edit it, and the trash icon to delete it. Note that deleting an account will also delete any transactions associated with it. You can add an account by clicking on the plus button at the bottom.

If you click on the name of an account in this list, it will take you to a page that lists information about the account and every transaction associated with it. This transaction table works the same way as the one in recent transactions. The newest transactions are at the top. You can edit and delete by click the pencil and trash can respectively. You can click the plus icon to add a transaction, and the form will automatically populate with the currently selected account. You can also export the transactions of the currently selected account by pressing the download icon.

### Counterparties

Because transactions can be both a deposit and a withdrawl, it doesn't make much sense to have a group named buyers or sellers. Instead, I have opted to use the financial term "counterparty", simply denoting the other side in a transaction. Your employer is a counterparty when they pay you, and Publix is a counterparty when you buy groceries.

You can view a list of the counterparties by clicking on the icon shaped like a storefront. The same add and delete icons are used here as well. You can also click on the plus button to add a counterparty. Similar to accounts, deleting a counterparty will also delete all transactions associated with it.

If you click on the name of a counterparty in the list, it will take you to a page that shows information about the counterparty and all transactions associated with it. Here too, you can edit and delete the transactions, as well as add new ones. The form will automatically populate with the currently selected counterparty. You can export the transactions of the currently selected counterparty by clicking the download icon.
