---
title: Add user – Safe Docs
url: https://docs.safe.global/config-service-configuration/add-user
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Add user – Safe Docs

Config Service Reference

Add users

# Add user

Add a new Django user. Users are generally admins from your organization that will have partial or total access to the Config Service.

After creation, you can access more options to [edit this user](/config-service-configuration/edit-user).

## Usage

You can edit an existing user by visiting this address: `http://localhost:8000/cfg/admin/auth/user/{user index}/change/`, where `{user index}` is the index of the user you want to edit.

## Parameters

### `Username`

A user name for identifying this user. Must be unique.

### `Password-based authentication`

This section is used to set whether the user will use Django's [built-in authentication system (opens in a new tab)](https://docs.djangoproject.com/en/5.1/topics/auth/) (`Enabled`), or will use an external authentication system (`Disabled`). If you enable this option, you will need to set a password for the user. If you disable this option, you will have to implement [your own authentication method (opens in a new tab)](https://docs.djangoproject.com/en/5.1/topics/auth/customizing/).

### `Password`

Opens a section to set a password for the user.

### `Confirm password`

A confirmation field for the password.

[Add or edit groups](/config-service-configuration/add-or-edit-group "Add or edit groups")[Edit users](/config-service-configuration/edit-user "Edit users")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Add user
  - Usage
  - Parameters
    - Username
    - Password-based authentication
    - Password
    - Confirm password

---

## Related Links

### Internal Links

- [edit this user](https://docs.safe.global/config-service-configuration/edit-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [https://docs.safe.global/config-service-configuration/add-user](https://docs.safe.global/config-service-configuration/add-user)
- [Add or edit groups](https://docs.safe.global/config-service-configuration/add-or-edit-group)
- [Edit users](https://docs.safe.global/config-service-configuration/edit-user)

### External Links

- [built-in authentication system(opens in a new tab)](https://docs.djangoproject.com/en/5.1/topics/auth)
- [your own authentication method(opens in a new tab)](https://docs.djangoproject.com/en/5.1/topics/auth/customizing)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)
