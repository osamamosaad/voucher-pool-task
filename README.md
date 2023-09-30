## My Hypothesis

As we are aware, the issue lies in the voucher generation and setting the voucher to the customer, followed by sending emails to customers.

I have devised a solution to enhance the success of  generation and setting the voucher and email delivery for the customer. To achieve this, I propose the following workflow:

When a requester triggers the voucher creation endpoint:
1. we will retrieve customer data from the database.
2. Subsequently, we will dispatch a job in `voucher-pool-queue` for each user associated with the provided offer ID.
3. The queue consumer will then manage the generation and assignment of vouchers to the database.
4. Another job queue will be activated to handle the email sending process.

It is essential to note that this solution is not flawless and requires several enhancements.

One area that needs improvement is the process of retrieving customer data and dispatching a job to `voucher-pool-queue` . This request only should be to fire an job, to tell start generation process, and that process will get the customers as batches and handle firing a seperate queue to each user to handle generation and assignine the voucher. this seperation will revent potential failures.

Additionally, the voucher generation code should be relocated to a dedicated microservice responsible for generating voucher codes. These codes will be stored in a table we can call it "voucher_bank" only has `id, voucher_code, status(avilable, picked_up)`, This separation is necessary to prevent duplication during the generation process which may led to excptions and lead to retry the code generation, and also helps to reduce generation costs when assigning vouchers to customers. By doing so, we can access voucher codes directly from the "voucher_bank" instead of generating them every time.

An alternative solution is to assign a single voucher code to an entire offer. That will reduce the generation costs and prevent duplication errors. In this scenario, there is no need to create a separate record for each user at the first; we can insert the record only when redemption occurs, and that will reduce the cost of generation, reduect the hevey write in the db, and also desk space, becase not each customer use the voucher.


The following diagrams serve as a simple illustration of my thoughts. I hope they are helpful. [Here](https://raw.githubusercontent.com/osamamosaad/voter-pool-task/master/scratches.svg?token=GHSAT0AAAAAACF7D27W3RSJWEEK3LXF4VIKZIYSKNA)


## ERD
Have a look to ERD [Here](./ERD.png)


## API
Postman API [HERE](https://documenter.getpostman.com/view/28881390/2s9YJaZ4V2)

## How to run
You can use the following commands within your project directory to setup and run the application:


Setup the Application:
```bash
make setup
```

To run Tests:
```bash
make run-test
```

To run Migrations:
```bash
make run-migration
```

to shutdown the Application:
```bash
make down
```
