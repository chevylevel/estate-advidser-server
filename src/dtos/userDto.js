export default class UserDto {
    id;
    email;
    roles;
    isActivated;
    favorites;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.roles = model.roles;
        this.isActivated = model.isActivated;
        this.favorites = model.favorites;
    }
}

