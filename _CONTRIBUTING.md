# Contributing

## Detailed Workflow

1. Clone from your fork if you haven't already

    git clone https://github.com/<username>/hunted

2. Add org master as upstream remote

    git remote add upstream https://github.com/the-hunted/hunted

3. Before you start making changes make sure you are in local master branch

    git checkout master

4. Every time you begin making a new set of changes, you must make sure your
   local master branch is in sync with the org's master

    git pull --rebase upstream master

5. Create a branch called feature to hold your changes

    git checkout -b feature

6. Make changes and commit frequently

7. When you're ready to submit changes, before that can happen, we need to
   handle the likely situation that other changes have been merged into the
   orgs master while you were working. Pull those new changes into your feature branch

    git pull --rebase upstream master

8. If there are any conflicts, open each file with a conflict in text editor.
   Everything between <<<<<<< HEAD and ======= should be the code in your code and
   evertying between ======= and >>>>>>> <some stuff here> will be the code pulled
   in from the org master in this case. You will have to decide which one of these blocks
   of code is appropriate to keep, then remove the <<<<<<< HEAD, =======, and
   >>>>>>> <some stuff here> lines.

9. With all the changes in place you can now push to origin.

    git push origin feature

10. From here, log into github and submit a pull request to the org master on the website.
    Someone on the team will review your request and either accept it or request that
    changes be made before it is merged with master.

11. If code was merged go to CODE MERGED section. If not, go to REVISIONS section.

CODE MERGED:

1. You should see a message on github.com that says "Pull request successfully merged and closed".
   There should be a button to delete branch. This will delete your feature branch on
   you fork. Click it to delete.

2. Now you need to remove the feature branch from your LOCAL repo. Checkout master branch and
   delete feature branch.

    git checkout master

    git branch -d feature

3. Now you need to remove the feature branch from your GITHUB repo. Checkout master branch and
   delete feature branch.

   git push origin --delete feature

4. Start back from step #4 up top.

REVISIONS:

1. Return to your local feature branch and make the changes you need to while making commit/s.

2. When you push your changes on this feature branch to your origins feature branch, they will
   be automatically added to your open pull request. Commit and push changes as needed.

    git push origin feature

3. Once your pull request has been accepted go to CODE MERGED section.




## General Workflow

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/reactorcore/<NAME_OF_REPO>.git
```

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

These commands will help you do this:

``` bash

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Make commits to your feature branch.

Prefix each commit like so
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.

