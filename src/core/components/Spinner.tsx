import './Spinner.css';

interface Props {
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    fullPage?: boolean;
}

/**
 * Reusable animated loading spinner.
 * @param size    - 'sm' | 'md' | 'lg' (default: 'md')
 * @param label   - optional text shown below the spinner
 * @param fullPage - if true, centres the spinner in the full page height
 */
const Spinner = ({ size = 'md', label = 'Loading...', fullPage = false }: Props) => {
    return (
        <div className={`spinner-wrapper ${fullPage ? 'spinner-wrapper--full-page' : ''}`}>
            <div className={`spinner spinner--${size}`} role="status" aria-label={label} />
            {label && <span className="spinner-label">{label}</span>}
        </div>
    );
};

export default Spinner;
