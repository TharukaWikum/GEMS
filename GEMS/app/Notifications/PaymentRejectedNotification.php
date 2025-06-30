<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentRejectedNotification extends Notification
{
    use Queueable;

    public string $reason;
    public string $type;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $type, string $reason)
    {
        $this->type = $type;
        $this->reason = $reason;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject("{$this->type} Payment Rejected")
            ->greeting("Dear {$notifiable->name},")
            ->line("Your {$this->type} payment has been rejected.")
            ->line("**Reason:**")
            ->line($this->reason)
            ->line("Please contact the front desk or re-submit the payment.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
