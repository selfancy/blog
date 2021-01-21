# Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/selfancy/blog/edit/main/docs/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/selfancy/blog/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.

## 流程图一
```mermaid
sequenceDiagram
Alice->>+John: Hello John, how are you?
Alice->>+John: John, can yoy hear me?
John-->>-Alice: Hi Alice, I can hear you!
John-->>-Alice: I feel great!
```
## 流程图二
```mermaid
graph TD
  id1[A] --> id2{B}
  id2{B} -- YES --> id3[C]
  id2{B} -- NO --> id4{D}
  id4{D} -- YES --> id5[E]
  id4{D} -- NO --> id6[F]
```
## 执行器触发流程
``` mermaid
graph TB
admin[admin]
client[客户端]
triggerQueue[调度队列]
triggerRemote[执行远程调度]
executorQueue[执行队列]
executeMethod[执行任务方法]
handleResult[执行结果]
callbackQueue[回调队列]

subgraph admin调度中心
admin-.->|调度触发|triggerQueue
triggerQueue-.-|循环监听队列调度|triggerRemote
end

triggerRemote-.-|新增执行记录|client
triggerRemote-->client
client-.-|更新调度结果|admin

subgraph 客户端执行器
client-.->|接收调度任务, 放入待执行队列|executorQueue
executorQueue-.->|循环监听队列任务|executeMethod
executeMethod-->handleResult
handleResult-->|放入回调队列|callbackQueue
callbackQueue-.->|循环监听队列回调, admin接收更新执行结果|admin
end
```
