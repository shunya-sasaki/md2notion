# md2notion

![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&labelColor=gray&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&labelColor=gray&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&labelColor=gray&logoColor=white)
![MIT](https://img.shields.io/github/license/shunya-sasaki/md2notion)

Upload local Markdown files to Databases in Notion.

## 📦 Requirements

- Node.js

## ⚙️ Setup

### Publish Notion API key

1. Run Notion app or login Notion web site.
2. Open settings (user preferences).
3. Select **Connections** in the left sidebar.
4. Click **Develop or manage integrations** link at the bottom of the page.
5. Fill in the form and click **Create** button.
6. After creating the integration, you can see the integration details page.
   Copy the "Internal Integration Token" value.

### Save API key

This app read API key from `NOTION_API_KEY` environment variable.
You can set it in your shell profile (e.g. `.bashrc`, `.zshrc`):

## 🚀 Usage

### Notion database required properties

Notion database is required to have name and another property (e.g, "Language").

For example, if the property name is "Language", the database should look like this:

| Name                              | Language   |
| --------------------------------- | ---------- |
| How to create virtual environment | Python     |
| How to build pacakges             | Python     |
| Introduction to TypeScript        | TypeScript |

### Get database ID

In Notion, you can get the database ID from the URL when you open the database page.
The structure of the URL is as follows:

```
https://www.notion.so/your-name/<database-id>?v=<view-identifies>
```

> [!NOTE]
> This app need only database ID, so you can ignore the view identifies part.

### Local document directory

In this app, you can organize your local Markdown files in a directory structure as follows:

```
<document-dir>
├── <database>
│   ├── <section>
│   │   ├── <article>.md
│   │   └── <article>.md
│   └── <section>
└── <database>
```

- You can name the directory and Markdown files as you like.
- The local directory can have multiple databases, sections, and articles.
- The section is related to the value of the property in the Notion database.
  The conversion rules are set in the config file (see below).

As example, if you have a Notion database with a property "Language",
you can organize your local Markdown files as follows:

```
notes
├── languages
│   ├── python
│   │   ├── how-to-build-pacakge.md
│   │   └── how-to-create-virtual-environment.md
│   └── typescript
└── tools
```

### Create config file

Create a file `config.json` in your working directory with the following content:

```json
{
  "localDir": "/Users/yourname/markdown-files-dir-path",
  "databases": {
    "<property name in local directory>": {
      "id": "<database id>",
      "name": "<property name in notion>",
      "sections": {
        "<section name in local directory>": {
          "name": "<property value in notion>"
        }
      }
    }
  }
}
```

For example, if you have a Notion database with a property "Language" and local directory structure as shown above, the config file should look like this:

```json
{
  "localDir": "/Users/yourname/notes",
  "databases": {
    "languages": {
      "id": "a1234567890abcdef1234567890abcdef12",
      "name": "Language",
      "sections": {
        "python": {
          "name": "Python"
        },
        "typescript": {
          "name": "TypeScript"
        }
      }
    },
    "tools": {
      "id": "b1234567890abcdef1234567890abcdef12",
      "name": "Tool",
      "sections": {
        "cli": {
          "name": "CLI"
        }
      }
    }
  }
}
```

### Run md2notion

Run the following command to upload local Markdown files to Notion:

---

**npm**:

```sh
npm run md2notion
```

---

**pnpm**:

```sh
pnpm run md2notion
```

---

After running the command, the app will read the local Markdown files
and upload them to the corresponding Notion database based on the config file!

## 📚 Reference

- [Notion integration](https://www.notion.com/integrations)
- [Notion API](https://developers.notion.com)

## 📄 License

MIT license.

See [LICENSE](./LICENSE) for more details.
