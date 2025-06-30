<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PlacementTestResultsReleased extends Notification
{
    use Queueable;

    public string $testTitle;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $testTitle)
    {
        $this->testTitle = $testTitle;
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
            ->subject('Placement Test Results Released')
            ->greeting("Hello " . $notifiable->user->name . ",")
            ->line("We are pleased to inform you that your placement test results for **{$this->testTitle}** are now available.")
            ->action('View Your Results', url('/student/placement-results')) // replace with your route if needed
            ->line('We encourage you to review your scores to plan your academic journey with us.')
            ->salutation('Thank you, and best wishes!');
    }

    /**
     * Get the array representation of the notification (optional).
     */
    public function toArray(object $notifiable): array
    {
        return [
            'test_title' => $this->testTitle,
        ];
    }
}
