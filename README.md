# Personalized Decision Assistant

An intelligent web application that enhances decision-making through expert analysis, data visualization, and interactive mindmaps. The system combines insights from multiple experts, analyzes various data sources, and presents information in an intuitive, interactive format.

## Features

### Core Functionality
- Multi-expert decision support system with specialized perspectives
- Interactive cumulative mindmap visualization with question generation
- Comprehensive file analysis (PDF, Excel, CSV, DOCX)
- Follow-up question generation
- Data export capabilities (CSV, XLSX)

### Expert System
- Dynamic expert panel selection based on question context
- Intelligent question generation for each expert
- Cumulative insight synthesis
- Expert-specific mindmap visualizations

### Data Visualization
- Interactive mindmap with draggable nodes
- Double-click node interaction for related questions
- Full-screen mindmap modal
- Hierarchical data representation

### File Management
- Multiple file format support
- Automated data extraction
- Integrated file viewer
- Data table visualization

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection
- API keys for OpenAI/Gemini (for expert analysis)

### Installation
1. Clone the repository
2. Configure API keys in `api-config.js`
3. Open `index.html` in a web browser

### Usage
1. Configure API settings
2. Upload relevant data files
3. Enter your question or decision topic
4. Review expert analyses and insights
5. Explore the interactive mindmap
6. Generate follow-up questions
7. Export analyzed data as needed

## Technical Details

### Architecture

```
personalised-decision-assistant/
├── index.html           # Main application interface
├── script.js           # Core application logic
├── api-config.js       # API configuration
├── experts.js          # Expert system implementation
├── mindmap-handlers.js # Mindmap functionality
└── pyworker.js        # Python worker for data processing
```

### Dependencies

#### External Libraries
- Bootstrap 5.3.3 (UI framework)
- jsMind (mindmap visualization)
- Mermaid 10.9.0 (diagram generation)
- XLSX (spreadsheet handling)
- Mammoth (DOCX processing)
- Marked (markdown processing)

#### APIs
- OpenAI API (intelligent analysis)
- Gemini API (data processing)

### Key Components

1. **Expert System (`experts.js`)**
   - Expert panel selection
   - Question generation
   - Answer synthesis
   - Final answer compilation

2. **Mindmap System (`mindmap-handlers.js`)**
   ```javascript
   {
     meta: {
       name: "Question Summary",
       author: "AI Assistant",
       version: "1.0"
     },
     format: "node_tree",
     data: {
       id: "root",
       topic: "Main Question",
       children: [...]
     }
   }
   ```

3. **File Processing**
   - PDF text extraction
   - Excel/CSV data parsing
   - DOCX content extraction
   - Data table generation

4. **UI Components**
   - Three-column layout (Experts, Chat, Files)
   - Modal dialogs for data and mindmap
   - File upload interface
   - Chat interface with typing animation

### Development Guidelines

1. **Code Organization**
   - Modular file structure
   - Clear separation of concerns
   - Event-driven architecture
   - Asynchronous operations handling

2. **API Integration**
   - Secure API key management
   - Error handling for API calls
   - Rate limiting consideration
   - Response validation

3. **Data Management**
   - File type validation
   - Data extraction error handling
   - Memory efficient processing
   - Clean data structure

4. **Testing**
   - API response validation
   - File processing verification
   - UI interaction testing
   - Cross-browser compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Update documentation
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For API configuration and usage questions, refer to the documentation or open an issue in the repository.
