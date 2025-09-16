---
sidebar_position: 2
---

# How to DOGE Your State: Guide for Open Source Beginners

This comprehensive tutorial explains both the technical and community sides of launching a state-level transparent government data initiative, using real open source workflows and licenses. This document expects that the reader is an experienced software engineer. Use [Vibe Coding for Beginners](/docs/howto/vibe-coding-for-beginners) if you need to catch up fast. If this is too much and you want to build a team of engineers instead, refer to [Building Your Team](#building-your-team).

***

### Purpose and Mission

**DOGE Network** is about transforming scattered public data into accessible insights for all, building a replicable model of efficient, transparent government through open data. Every state project must operate in the open: collaborating publicly, licensing code and data so others can use it, and fostering a participatory community where everyone is welcome and contributions are celebrated.

***

### Getting Started: GitHub Account and DOGE Network Access

Before diving into the technical work, you'll need to set up your GitHub account and request access to the DOGE Network organization. Here's how to get started:

#### Creating Your GitHub Account

1. **Visit GitHub:** Go to [github.com](https://github.com) and click "Sign up"
2. **Choose your username:** Pick a professional username that you'll be comfortable using for open source work. This will be visible on all your contributions
3. **Verify your email:** Complete the email verification process to activate your account
4. **Set up your profile:** Add a profile picture and brief bio. This helps build trust in the open source community
5. **Enable two-factor authentication:** Go to Settings → Password and authentication → Two-factor authentication. This is required for most organizations

#### Requesting DOGE Network Membership

Once your GitHub account is set up:

1. **Find cali-doge on X (Twitter):** Search for the cali-doge account on X
2. **Send a message:** Include the following information in your message:
   - Your GitHub username
   - Which state you're interested in working on
   - Brief description of your background (engineering, data analysis, policy, etc.)
   - What type of contribution you're planning (frontend, backend, data collection, etc.)

**Example message:**
```
Hi! I'd like to join the DOGE Network GitHub organization. 

GitHub username: [your-username]
State: [your-state]
Background: [brief description]
Planning to contribute: [frontend/backend/data/etc.]

Looking forward to contributing to government transparency!
```

3. **Wait for invitation:** You'll receive a GitHub organization invitation via email once approved
4. **Accept the invitation:** Check your email and accept the invitation to join the DOGE-Network organization

#### What Happens After You Join

Once you're a member of the DOGE-Network organization:

- You'll have write access to create branches directly in repositories (no need to fork)
- You can create new repositories for your state if one doesn't exist yet
- You can participate in organization discussions and planning
- You'll be able to create pull requests and contribute to existing projects

***

### Project Structure: Practical Steps

#### Frontend

- **Starter template:** Instead of forking, new contributors need to request to become a member of the DOGE-Network which will give them write access to all repositories. This makes it possible for members to create pull requests instead of forking. Ping cali-doge over X to request to become a member of the DOGE-Network GitHub organization. Once a member, you can request to create a new DOGE repository for your state or contribute to an existing state.
- **Hosting:** Deploy using Vercel for easy CICD and public access.
    - Write and maintain thorough README docs and “getting started” guides to help new contributors install dependencies, run the project, and contribute quickly.
- **Visualizations:** Start with modular dashboards. Add or swap in charts, maps, and reports as you identify public data sets that add value.

#### Backend

- **ETL pipeline:** Each state needs scripts to collect raw government data, convert it for analysis/sharing, and load it into a shared database (Postgres).
    - **Extract:** Use Playwright (web scraping), PyMuPDF (PDF), and standard libraries for CSV/TSV to fetch and parse source files.
    - **Transform:** Convert all results to a consistent JSON format. This step should be automated and repeatable.
    - **Load:** Import the cleaned JSON into a Postgres database, with documentation on the schema.
- **Versioning and updates:** Use scheduled jobs (e.g., GitHub Actions or cron jobs) to automate extraction and loading, keeping a changelog and archiving older results for transparency.
- **Repo organization:** One repo per state frontend and backend project under the DOGE-network org; in the future, migrate shared backend work to a nonprofit.

***

### Open Source Community Practices: Beginner-Friendly Guide

#### Contribution Workflow

Engineers already familiar with basic git will find contributing to open source very similar—but with more openness and transparency at every step:

- **Become a member:** Request membership in the DOGE-Network organization by contacting cali-doge on X. This gives you write access to create branches directly in the repositories.
- **Clone and branch:** Clone the repository directly and create a new branch for your feature or fix, rather than working on main. (e.g., `git checkout -b add-illinois-hospital-data`)
- **Make your changes.** Follow any code style or contribution guidelines in the repo.
- **Pull requests:** Push your changes to your branch, then use GitHub's "Pull request" button to propose merging your changes into the main project.
- **Reviews:** Expect your code to be reviewed by others. Accept suggestions and iterate—this is how open source improves everyone’s code and documentation.
- **Issues and discussions:** Use GitHub Issues to report bugs or propose ideas. Participate in Discussions, chat (Slack/Discord), or mailing lists for big ideas and roadmap topics.

#### Community and Collaboration

- **Public by default:** All project work happens on GitHub or in public chat/forums. Avoid private email or DMs for project discussions so others can learn and participate.
- **Clear communication:** Use detailed commit messages and PR descriptions. Good documentation and comments help future contributors (and your own future self).
- **Open to feedback:** Anyone can comment, test, or suggest changes—even those outside the core team. Embrace openness and be constructive in reviews.
- **Recognition:** All contributions matter (code, docs, data, QA, outreach). Give credit in release notes, acknowledgments, and project docs.

***

### Open Source Licensing: Apache 2.0 and CC BY Explained for Engineers

#### What is Apache License 2.0?

- **Permissive OSS license:** The Apache 2.0 license allows almost anyone to use, modify, distribute, and even sell code based on the project—even as part of closed source products.
- **Key requirements:** If you use or modify Apache-licensed code, you must:
    - Include the original license file and copyright notice in your distribution.
    - Document any significant code changes you made.
    - Do not use project trademarks or branding without permission.
    - If your code uses patents, you must grant users a license to those patents (a “patent grant”).
- **Not “viral”:** Unlike copyleft licenses (e.g., GPL), Apache does not require you to open source any modifications or related work. You can keep those closed if you wish—though the DOGE project encourages openness for community growth.
- **Usable commercially:** Code under Apache 2.0 can be included in professional, commercial products as long as those attribution requirements are met.

#### What is Creative Commons Attribution (CC BY)?

- **For non-software content:** Use CC BY for documentation, visualizations, and data sets—not code.
- **What CC BY (“Attribution”) allows:**
    - Anyone can use, share, adapt, remix, even for commercial purposes.
    - They must give appropriate credit (attribution) to the original author(s).
    - They must note if changes were made.
- **No other restrictions:** There is no requirement to share derived work under the same license (that would be “ShareAlike” or “SA”), and no non-commercial or “no derivatives” limitation.
- **Why it matters:** CC BY maximizes re-use and remix potential, making it easy for others to learn from and build on DOGE projects.

#### Comparison Table (for quick reference)

| License         | What you can do                            | What you must do                 | Where used            |
|-----------------|--------------------------------------------|----------------------------------|-----------------------|
| Apache 2.0      | Use, modify, redistribute, sell            | Keep copyright, license, disclose changes | Software code         |
| CC BY           | Use, remix, share, sell, adapt (any use)   | Give author credit, note changes | Data, docs, images    |

***

### Technical Implementation Summary

| Layer    | What to Use                             | Guidance/Tools                |
|----------|------------------------------------------|-------------------------------|
| Frontend | UI (per-state fork)                      | React-based with open issues  |
| Backend  | ETL pipeline (per-state fork)            | PyMuPDF, Playwright, csv/tsv, Postgres |
| Repository  | GitHub Organization (DOGE-network)        | Public, rigorous code review, CI/CD |
| Hosting | Vercel project                               | Managed for public deployment |

***

***

### Launch Checklist

- [ ] Request DOGE-Network membership and create/customize a repository for your state's needs
- [ ] Research and collect high-value data sources (HTML, PDF, CSV, TSV, etc.)
- [ ] Build ETL scripts (extract, transform, load)
- [ ] Open source all code/scripts under the DOGE-network org
- [ ] Use public channels for onboarding and collaboration
- [ ] Prep backend for nonprofit migration as needed
- [ ] Regularly celebrate milestones and contributors

***

## Building Your Team

If the technical implementation feels overwhelming, or if you're looking to scale beyond what you can accomplish alone, building a strong team is essential. Drawing from Jono Bacon's expertise in "The Art of Community" and his extensive work in open source leadership, here's how to build an effective team for your state's DOGE project.

### Define Your Team's Purpose and Mission

Before recruiting anyone, clearly articulate what your team aims to achieve. Create a team charter that includes:

- **Specific objectives:** What data will you focus on? What problems will you solve for your state's citizens?
- **Scope and boundaries:** Which government departments, data types, or geographic regions will you cover?
- **Success metrics:** How will you measure impact? (e.g., datasets published, citizen engagement, government transparency improvements)
- **Timeline and milestones:** What are your short-term and long-term goals?

As Bacon emphasizes, this charter serves as your "guiding star" and should be developed collaboratively with potential team members to foster ownership and commitment.

### Recruit the Right People

Look for team members who bring both technical skills and passion for transparency. According to Bacon's principles, effective teams are "units of belonging" where members feel energized and develop genuine connection to the mission. Seek people who:

- **Share your vision:** Alignment with transparency and open government principles
- **Bring complementary skills:** Data engineers, frontend developers, UX designers, policy experts, community organizers
- **Demonstrate leadership qualities:** Ability to inspire others and take initiative
- **Have local knowledge:** Understanding of your state's government structure and data landscape

Don't just focus on technical contributors—community managers, documentation writers, and outreach specialists are equally valuable for long-term success.

### Create Clear Roles and Responsibilities

Based on Bacon's team building framework, establish clear roles early:

- **Technical Lead:** Oversees ETL pipelines, database architecture, and code quality
- **Frontend Lead:** Manages user interface, data visualization, and user experience
- **Community Manager:** Handles outreach, documentation, and new contributor onboarding
- **Data Specialist:** Identifies valuable datasets, understands government data formats
- **Project Coordinator:** Manages timelines, facilitates meetings, tracks progress

Each role should have defined responsibilities, decision-making authority, and accountability measures.

### Establish Communication and Collaboration Protocols

Following open source best practices that Bacon advocates:

- **Public by default:** Use X msg groups so that anyone can join
- **Regular check-ins:** Weekly team meetings with published agendas and notes
- **Asynchronous communication:** Accommodate different schedules and time zones
- **Decision-making processes:** Clear protocols for how decisions are made and documented
- **Conflict resolution:** Established methods for addressing disagreements constructively

### Provide Resources and Support

Ensure your team has what they need to succeed:

- **Technical infrastructure:** Access to development environments, databases, and deployment platforms
- **Learning resources:** Documentation, tutorials, and training materials
- **Recognition systems:** Regular acknowledgment of contributions in release notes and community updates
- **Growth opportunities:** Paths for team members to develop new skills and take on leadership roles

### Foster Continuous Improvement

Bacon emphasizes the importance of adaptive leadership. Regularly assess your team's effectiveness:

- **Retrospectives:** Monthly reviews of what's working and what needs improvement
- **Feedback loops:** Mechanisms for team members to share concerns and suggestions
- **Skill development:** Opportunities for learning and professional growth
- **Mission alignment:** Periodic reviews to ensure the team remains focused on core objectives

### Building Beyond Your Core Team

As your project grows, consider how to engage the broader community:

- **Contributor onboarding:** Clear paths for new volunteers to get involved
- **Mentorship programs:** Pairing experienced contributors with newcomers
- **Event organization:** Hackathons, data days, or civic tech meetups
- **Partnership building:** Connections with other civic tech organizations, government agencies, and academic institutions

Remember Bacon's key insight: successful communities create environments where people feel they belong and can make meaningful contributions. Your team should be the foundation that enables this broader community engagement.

***

These resources provide a clear, practical roadmap for engineers to contribute to state-level open data projects—even if they're new to open source—by demystifying community practice, licensing, and technical workflow.

### References

- **Fork:** A fork is a copy of a repository that allows you to freely experiment with changes without affecting the original project. Learn more: https://docs.github.com/en/get-started/quickstart/fork-a-repo
- **Pull Request:** A pull request is a proposal to merge a set of changes from one branch into another. Learn more: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests

### Additional Resources

- (https://DOGE-network.org)
- (https://www.jonobacon.com)
- (https://www.jonobacon.com/2019/04/29/open-source-example/)
- (https://www.commonroom.io/blog/five-steps-for-building-a-thriving-open-source-community/)
- (https://www.jonobacon.com/2017/04/28/anonymous-open-source-projects/)
- (https://www.jonobacon.com/2024/11/21/the-unsung-hero-open-source-community-manager/)
- (https://opensource.com/business/16/8/building-career-open-source)