import React, { useState, useEffect } from 'react';
import { Event, fetchGoogleCalendarEvents } from '../../data/events';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface EventsCalendarProps {
  showHeader?: boolean;
  compact?: boolean;
}

export default function EventsCalendar({
  showHeader = true,
  compact = false,
}: EventsCalendarProps): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fetch Google Calendar events
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get Google Calendar events if API credentials are available
        const apiKey = siteConfig.customFields?.googleCalendarApiKey as string;
        const calendarId = siteConfig.customFields?.googleCalendarId as string;

        if (apiKey && calendarId) {
          const googleEvents = await fetchGoogleCalendarEvents(
            apiKey,
            calendarId
          );
          setAllEvents(googleEvents);
        } else {
          setAllEvents([]);
        }
      } catch {
        setError('Failed to load calendar events');
        // console.error('Error loading events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [siteConfig]);

  // Filter events for the current month view
  const monthEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const eventEndDate = event.endDate ? new Date(event.endDate) : null;

    // Check if event starts in this month
    const startsInMonth =
      eventDate.getFullYear() === year && eventDate.getMonth() === month;

    // Check if event ends in this month
    const endsInMonth =
      eventEndDate &&
      eventEndDate.getFullYear() === year &&
      eventEndDate.getMonth() === month;

    // Check if event spans across this month
    const spansMonth =
      eventEndDate &&
      eventDate.getTime() <= new Date(year, month + 1, 0).getTime() &&
      eventEndDate.getTime() >= new Date(year, month, 1).getTime();

    return startsInMonth || endsInMonth || spansMonth;
  });

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(year, month + (direction === 'next' ? 1 : -1), 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const todayDate = new Date(today.getFullYear(), today.getMonth(), 1);
    setCurrentDate(todayDate);
  };

  const getEventsForDay = (day: number): Event[] => {
    const dayDate = new Date(year, month, day);
    const dayString = dayDate.toISOString().split('T')[0];

    return monthEvents.filter(event => {
      const eventDate = event.date;
      const eventEndDate = event.endDate;

      if (eventEndDate) {
        // Multi-day event
        return dayString >= eventDate && dayString <= eventEndDate;
      } else {
        // Single day event
        return eventDate === dayString;
      }
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventTypeColor = (type: Event['type']): string => {
    switch (type) {
      case 'biannual':
        return '#e74c3c';
      case 'weekly':
        return '#3498db';
      case 'optional':
        return '#95a5a6';
      case 'virtual':
        return '#9b59b6';
      case 'google':
        return '#4285f4'; // Google blue
      default:
        return '#34495e';
    }
  };

  const renderCalendarView = () => {
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className={styles.calendarDay}></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      calendarDays.push(
        <div
          key={day}
          className={`${styles.calendarDay} ${isToday ? styles.today : ''} ${dayEvents.length > 0 ? styles.hasEvents : ''}`}
        >
          <div className={styles.dayNumber}>{day}</div>
          <div className={styles.dayEvents}>
            {dayEvents.slice(0, compact ? 1 : 3).map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className={styles.dayEvent}
                style={{ backgroundColor: getEventTypeColor(event.type) }}
                title={event.title}
              >
                {compact
                  ? '•'
                  : event.title.substring(0, 10) +
                    (event.title.length > 10 ? '...' : '')}
              </div>
            ))}
            {dayEvents.length > (compact ? 1 : 3) && (
              <div className={styles.moreEvents}>
                +{dayEvents.length - (compact ? 1 : 3)} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.calendarGrid}>
        {DAYS.map(day => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  const renderListView = () => {
    // Show all events for the current month in list view
    const monthEventsSorted = monthEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
      <div className={styles.listView}>
        {monthEventsSorted.length === 0 ? (
          <div className={styles.noEvents}>
            <p>
              No events scheduled for {MONTHS[month]} {year}
            </p>
          </div>
        ) : (
          monthEventsSorted.map(event => (
            <div key={event.id} className={styles.eventListItem}>
              <div
                className={styles.eventTypeIndicator}
                style={{ backgroundColor: getEventTypeColor(event.type) }}
              ></div>
              <div className={styles.eventDetails}>
                <h4 className={styles.eventTitle}>
                  {event.title}
                  {event.url && (
                    <span className={styles.meetingUrl}>
                      {' '}
                      --{' '}
                      <a
                        href={event.url}
                        target={
                          event.url.startsWith('http') ? '_blank' : '_self'
                        }
                      >
                        {event.url}
                      </a>
                    </span>
                  )}
                </h4>
                <div className={styles.eventMeta}>
                  <span className={styles.eventDate}>
                    {formatDate(event.date)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </span>
                  {event.location && (
                    <span className={styles.eventLocation}>
                      {event.location}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className={styles.eventDescription}>{event.description}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.eventsCalendar}>
        <div className={styles.loadingState}>
          <p>Loading calendar events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.eventsCalendar}>
        <div className={styles.errorState}>
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.eventsCalendar}>
      {showHeader && (
        <div className={styles.calendarHeader}>
          <div className={styles.calendarControls}>
            <button
              onClick={() => navigateMonth('prev')}
              className={styles.navButton}
            >
              ←
            </button>
            <h3 className={styles.monthTitle}>
              {MONTHS[month]} {year}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className={styles.navButton}
            >
              →
            </button>
          </div>
          <div className={styles.viewControls}>
            <button onClick={goToToday} className={styles.todayButton}>
              Today
            </button>
            <div className={styles.viewToggle}>
              <button
                onClick={() => setView('calendar')}
                className={`${styles.viewButton} ${view === 'calendar' ? styles.active : ''}`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView('list')}
                className={`${styles.viewButton} ${view === 'list' ? styles.active : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'calendar' ? renderCalendarView() : renderListView()}

      {showHeader && (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: '#4285f4' }}
            ></div>
            <span>Google Calendar Events</span>
          </div>
          <div className={styles.legendItem}>
            <span>
              Events in {MONTHS[month]}: {monthEvents.length}
            </span>
          </div>
          <div className={styles.legendItem}>
            <span>Total Events: {allEvents.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
