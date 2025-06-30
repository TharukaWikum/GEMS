<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CourseEnrollmentConfirmed extends Notification
{
    use Queueable;

    protected $courseName;
    protected $amount;
    protected $paymentMethod;

    public function __construct($courseName, $amount, $paymentMethod)
    {
        $this->courseName = $courseName;
        $this->amount = $amount;
        $this->paymentMethod = $paymentMethod;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('🎉 Course Enrollment Confirmed')
            ->greeting('Hi ' . $notifiable->name . ',')
            ->line('Your course enrollment has been confirmed.')
            ->line('**Course:** ' . $this->courseName)
            ->line('**Paid Amount:** Rs. ' . number_format($this->amount, 2))
            ->line('**Payment Method:** ' . $this->paymentMethod)
            ->line('Thank you for joining us! We wish you all the best with your studies.')
            ->salutation('Regards, GEMS Team');
    }
}
