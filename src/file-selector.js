// Store selected files and available files
let selectedFiles = new Map(); // Map of id -> file info
let availableFiles = []; // Store loaded files

// Function to load available files from config
export async function loadAvailableFiles() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        availableFiles = config.files; // Store files globally
        return config.files;
    } catch (error) {
        console.error('Error loading file config:', error);
        availableFiles = [];
        return [];
    }
}

// Function to toggle file selection
export function toggleFileSelection(fileId) {
    const file = availableFiles.find(f => f.id === fileId);
    if (!file) return false;

    if (selectedFiles.has(fileId)) {
        selectedFiles.delete(fileId);
        return false;
    } else {
        selectedFiles.set(fileId, file);
        return true;
    }
}

// Function to get selected files
export function getSelectedFiles() {
    return Array.from(selectedFiles.values());
}

// Function to clear selected files
export function clearSelectedFiles() {
    selectedFiles.clear();
}

// File button template
const fileButtonTemplate = document.createElement('template');
fileButtonTemplate.innerHTML = `
    <button class="file-select-btn btn btn-outline-primary" data-file-id="" data-file-path="" data-file-type="" data-file-name="">
        <i class="file-icon bi me-2"></i>
        <span class="file-name text-truncate"></span>
        <i class="bi bi-check-circle-fill text-success selected-indicator ms-2"></i>
    </button>
`;

// Function to render file selection buttons
export function renderFileButtons(files, container) {
    container.innerHTML = ''; // Clear existing content
    
    const fileGrid = document.createElement('div');
    fileGrid.className = 'file-grid';
    
    files.forEach(file => {
        // Clone the template
        const button = fileButtonTemplate.content.firstElementChild.cloneNode(true);
        
        // Set button attributes with full file info
        button.dataset.fileId = file.id;
        button.dataset.filePath = file.path;
        button.dataset.fileType = file.type;
        button.dataset.fileName = file.name;
        
        // Update button content
        const iconClass = getFileTypeIcon(file.type);
        button.querySelector('.file-icon').className = `bi ${iconClass} me-2`;
        button.querySelector('.file-name').textContent = file.name;
        
        // Add click handler
        button.addEventListener('click', () => {
            const isSelected = toggleFileSelection(file.id);
            button.classList.toggle('active', isSelected);
            button.querySelector('.selected-indicator').classList.toggle('d-none', !isSelected);
        });
        
        fileGrid.appendChild(button);
    });
    
    container.appendChild(fileGrid);
}

// Helper function to get icon class based on file type
function getFileTypeIcon(type) {
    const icons = {
        excel: 'bi-file-earmark-spreadsheet',
        csv: 'bi-file-earmark-text',
        pdf: 'bi-file-earmark-pdf',
        docx: 'bi-file-earmark-word'
    };
    return icons[type] || 'bi-file-earmark';
}
