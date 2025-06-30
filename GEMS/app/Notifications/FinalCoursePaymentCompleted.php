<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class FinalCoursePaymentCompleted extends Notification
{
    use Queueable;

    protected $courseName;
    protected $totalPaid;
    protected $paymentMethod;

    /**
     * Create a new notification instance.
     */
    public function __construct($courseName, $totalPaid, $paymentMethod)
    {
        $this->courseName = $courseName;
        $this->totalPaid = $totalPaid;
        $this->paymentMethod = $paymentMethod;
    }

    /**
     * Get the notification's delivery channels.
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
            ->subject('Final Course Payment Completed')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line("We have received your final payment for the course: **{$this->courseName}**.")
            ->line("**Total Amount Paid:** Rs. {$this->totalPaid}")
            ->line("**Payment Method:** {$this->paymentMethod}")
            ->line('Your payment is now fully complete. You’re officially enrolled in the course.')
            ->line('Thank you for choosing our institute!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'course' => $this->courseName,
            'total_paid' => $this->totalPaid,
            'method' => $this->paymentMethod,
        ];
    }
}
