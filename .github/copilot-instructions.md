# Copilot Instructions for tanukisack.github.io

## Project Overview
This is a personal portfolio website with an interactive **terminal-style CLI interface**. It's a GitHub Pages site featuring James DeLisa's professional profile, built as a fake Linux terminal that responds to commands typed into a text input.

## Architecture & Key Patterns

### Single-Page Terminal Application
- **`index.html`**: Entry point with a hidden textarea (for input capture) and visible pseudo-terminal display
- **`js/main.js`**: Core command dispatcher (`commander()`) that maps user input to handlers
- **`js/commands.js`**: Data layer storing command outputs as arrays of HTML strings (e.g., `help`, `who`, `header`, `links`)
- **`js/caret.js`**: Cursor position tracking using CSS transforms
- **`css/style.css`**: Terminal theming with color palette (#519975 text, #242953 dark background)

### Data Flow
1. User types into hidden textarea (onkeyup/onkeydown events)
2. `typeIt()` echoes input to visible display with `nl2br()` sanitization
3. Enter key triggers `commander()` which matches against predefined cases
4. Matching case calls `loopLines()` to animate output with staggered `addLine()` calls
5. `addLine()` inserts new `<p>` elements into `#terminal` and scrolls to bottom

### Command Pattern
Commands are string arrays stored as global variables (e.g., `help`, `who`, `header`). The `commander()` switch statement checks lowercase input and calls `loopLines(dataArray, cssClass, delayMs)` to render with animation delays.

**Example**: Type `help` → triggers `case "help"` → calls `loopLines(help, "color2 margin", 80)` which renders each line with 80ms stagger.

## Critical Workflows

### Adding New Commands
1. Define output as array in `js/commands.js`:
   ```javascript
   mycommand = [
     "<br>",
     "Line 1 content",
     "Line 2 content",
     "<br>"
   ];
   ```
2. Add case in `main.js` `commander()`:
   ```javascript
   case "mycommand":
     loopLines(mycommand, "color2 margin", 80);
     break;
   ```
3. Update `help` array to document the new command

### Password Feature
- `password` variable defined in `commands.js` (currently "james")
- Typing `secret` sets `pw = true` and adds "password" CSS class to `#liner`
- While `pw = true`, input displays as asterisks and checks against `password` variable
- On correct match + Enter, displays `secret` array content
- **Note**: Password is exposed in console on page load (intentional easter egg)

### External Links
Links open in new tabs with 500ms delay via `newTab()`. Variables in `commands.js` store URLs (`linkedin`, `github`, `email`, `youtube`, `twitter`).

## Code Conventions

### CSS Classes & Styling
- `.cursor`: Animated blinking caret at line end
- `.color2 .margin`: Output styling (teal color, left margin)
- `.command`: Command names in help text (cyan highlight)
- `.error`: Error messages (red)
- `.index`: Credit line (muted)
- `#liner::before`: Terminal prompt prefix ("guest@jamesdelisa.com:~$")

### HTML/Entity Handling
- Spaces in output are converted to `&nbsp;` pairs via `addLine()` for proper spacing in terminal
- All HTML is pre-formatted in data arrays; no DOM generation from plain text
- Selection highlight is yellow (#e0da66)

### State Management
- `git`: Current position in command history (arrow key navigation)
- `pw`: Password mode toggle
- `pwd`: Tracks if correct password was entered
- `commands[]`: Array storing all typed commands for history recall

### Keyboard Shortcuts
- **Enter**: Execute command or submit password
- **Arrow Up/Down**: Navigate command history
- **F3**: Reload page (keyCode 181)
- **Arrow Left/Right**: Move caret within textarea (pixel-based via `moveIt()`)

## External Dependencies & Integration

### Google Analytics
- `gtag.js` loaded asynchronously in `<head>`
- Tracking ID: `G-8JZCNESBEW`

### Social Links
URLs in `commands.js` reference:
- LinkedIn profile (incomplete in template)
- GitHub (links to `/tanukisack`)
- Email: `delisavjames85@gmail.com`

### Attribution
Original digital craftsman credit linked in header output: `https://fkcodes.com/`

## Performance Notes
- All animations use CSS (`@keyframes typing`, `blinker`) or staggered timeouts
- Content is pre-rendered HTML, no heavy computation
- `window.scrollTo()` on every `addLine()` ensures terminal scrolls to latest output
- Min viewport width: 550px (enforced in body CSS)

## Common Modifications
- **Update portfolio info**: Edit variables in `commands.js` (email, LinkedIn, GitHub URLs)
- **Add content**: Append arrays to `commands.js` and corresponding cases to `commander()`
- **Change colors**: Modify CSS color values in `style.css` (#519975, #e0da66, #242953, etc.)
- **Adjust animation speed**: Change `time` parameter in `loopLines()` calls (currently 80ms per line)
