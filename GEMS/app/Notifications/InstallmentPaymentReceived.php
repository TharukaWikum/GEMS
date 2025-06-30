<?php


namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class InstallmentPaymentReceived extends Notification
{
    public $amount, $method, $fullAmount, $totalPaid;

    public function __construct($amount, $method, $fullAmount, $totalPaid)
    {
        $this->amount = $amount;
        $this->method = $method;
        $this->fullAmount = $fullAmount;
        $this->totalPaid = $totalPaid;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $remaining = $this->fullAmount - $this->totalPaid;

        return (new MailMessage)
            ->subject('Installment Payment Received')
            ->greeting("Hello {$notifiable->name},")
            ->line("We have received your installment payment of Rs. {$this->amount} via {$this->method}.")
            ->line("Total Paid: Rs. {$this->totalPaid} / Rs. {$this->fullAmount}")
            ->line("Remaining Balance: Rs. {$remaining}")
            ->line("Thank you for staying on track with your course payments.");
    }
}
