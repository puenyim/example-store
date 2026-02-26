import './ErrorMessage.css';

interface Props {
    message: string;
    onRetry?: () => void;
    fullPage?: boolean;
}

/**
 * Reusable error message display.
 * Optionally shows a "Retry" button if `onRetry` is provided.
 */
const ErrorMessage = ({ message, onRetry, fullPage = false }: Props) => {
    return (
        <div className={`error-msg ${fullPage ? 'error-msg--full-page' : ''}`}>
            <div className="error-msg__card">
                <span className="error-msg__icon" role="img" aria-label="error">
                    ⚠️
                </span>
                <p className="error-msg__text">{message}</p>
                {onRetry && (
                    <button className="error-msg__retry-btn" onClick={onRetry}>
                        ↻ Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
