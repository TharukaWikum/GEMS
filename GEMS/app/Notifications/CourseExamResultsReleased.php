<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseExamResultsReleased extends Notification
{
    use Queueable;

    protected $examTitle;
    /**
     * Create a new notification instance.
     */
      public function __construct($examTitle)
    {
        $this->examTitle = $examTitle;
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
            ->subject('Course Exam Results Released')
            ->greeting("Hi {$notifiable->user->name},")
            ->line("Your course exam results for \"{$this->examTitle}\" have been released.")
            ->action('View Results', url('/student/dashboard'))
            ->line('Good luck!');
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
