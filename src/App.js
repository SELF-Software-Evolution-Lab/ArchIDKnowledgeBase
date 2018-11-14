import React, {Component} from 'react';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: 0
        }
    }

    rulesData = [
        {
            action: "Implement Serializable interface in this DTO",
            compliantSolution: `public class AuthorDTO implements Serializable {
    ...
}`,
            debt: 10,
            description: "DTOs must implement Serializable interface to provide serialization features.",
            nonCompliantExample: `public class AuthorDTO {
    ...
}`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "DTOs must implement Serializable"
        },
        {
            action: "Add empty constructor for serializing",
            compliantSolution: `public AuthorDTO(String name) {
    this.name = name;
}
...
public AuthorDTO() {
}`,
            debt: 10,
            description: "DTOs must have an empty constructor for serializing with getters and setters.",
            nonCompliantExample: `public AuthorDTO(String name) {
    this.name = name;
}
//No additional empty constructor`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "DTOs must have an empty constructor for serializing"
        },
        {
            action: "Remove or edit non-serializable fields",
            compliantSolution: `private Integer id;`,
            debt: 15,
            description: "DTOs must not contain primitive-type attributes, as these cannot be serialized.",
            nonCompliantExample: `private int id;`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "DTOs must have only serializable fields"
        },
        {
            action: "Add missing getter or setter",
            compliantSolution: `private Boolean loggedIn;
...
public Boolean isLoggedIn() {
    ...
}`,
            debt: 10,
            description: "DTOs must have a getter and setter for each field in the class.",
            nonCompliantExample: `private Boolean loggedIn;
...`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "All fields on DTOs must have getters and setters"
        },
        {
            action: "Check constructor from Entity implementation in DTO",
            compliantSolution: `public AuthorDTO(AuthorEntity entity) {
    if(entity != null) {
        this.name = entity.name;
    }
    ...
}`,
            debt: 10,
            description: `DTOs must have a constructor with an Entity as a parameter.
This constructor must check nullity before assigning values.
It must also assign all the corresponding fields in the DTO`,
            nonCompliantExample: `public AuthorDTO(AuthorEntity entity) {
    this.name = entity.name;
    ...
}`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "DTOs must have a constructor with an Entity as a parameter"
        },
        {
            action: "Check toEntity implementation in DTO",
            compliantSolution: `public AuthorEntity toEntity() {
    AuthorEntity entity = new AuthorEntity();
    entity.setName(this.name);
    ...
    return entity;
}`,
            debt: 10,
            description: "DTOs must have a toEntity method that converts the DTO to an Entity. This method must assign each field of the DTO to the Entity variable.",
            nonCompliantExample: `public AuthorEntity toEntity() {
     return new AuthorEntity();
}`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "toEntity methods in DTOs must convert the object to an Entity."
        },
        {
            action: "Remove fields that are not of type DTO or List of DTOs",
            compliantSolution: `private List<BookDTO> books;`,
            debt: 15,
            description: "DetailTOs must only contain field of type DTO or List of DTOs.",
            nonCompliantExample: `private int age;`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "Fields on DetailDTOs must be of type DTO or List"
        },
        {
            action: "Check constructor from Entity implementation in DetailTO",
            compliantSolution: `public AuthorDetailDTO(AuthorEntity entity) {
    super(entity);
    if(entity != null) {
        this.books = entity.books;
        ...
    }
}`,
            debt: 10,
            description: `DetailTOs must have a constructor with an Entity as a parameter.
This constructor must call the superclass constructor using super.
This constructor must check nullity before assigning values.
It must also assign all the corresponding fields in the DTO`,
            nonCompliantExample: `public AuthorDetailDTO(AuthorEntity entity) {
    this.books = entity.books;
    ...
}`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "DetailTOs must have a constructor with an Entity as a parameter"
        },
        {
            action: "Check toEntity implementation in DetailDTO",
            compliantSolution: `public AuthorEntity toEntity() {
    AuthorEntity entity = new AuthorEntity();
    entity.setName(this.name);
    ...
    return entity;
}`,
            debt: 10,
            description: "DetailDTOs must have a toEntity method that converts the DTO to an Entity. This method must call the superclass toEntity method. This method must assign each field of the DTO to the Entity variable.",
            nonCompliantExample: `public AuthorEntity toEntity() {
     return new AuthorEntity();
}`,
            severity: "MINOR",
            structuralElement: "dtos",
            title: "toEntity methods in DetailDTOs must convert the object to an Entity."
        },
        {
            action: "Add missing Path annotation on Resource",
            compliantSolution: `@Path("author")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            debt: 10,
            description: "Resources must have a Path annotation defining the path to the resource. This does not apply to subresources.",
            nonCompliantExample: `@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            severity: "MINOR",
            structuralElement: "services",
            title: "Resource classes must have a Path annotation"
        },
        {
            action: "Add missing Consumes annotation on Resource",
            compliantSolution: `@Path("author")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            debt: 10,
            description: "Resources must have a Consumes annotation defining the type of data the it consumes.",
            nonCompliantExample: `@Path("author")
@Produces(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            severity: "MINOR",
            structuralElement: "services",
            title: "Resource classes must have a Consumes annotation"
        },
        {
            action: "Add missing Produces annotation on Resource",
            compliantSolution: `@Path("author")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            debt: 10,
            description: "Resources must have a Produces annotation defining the type of data it returns.",
            nonCompliantExample: `@Path("author")
@Consumes(MediaType.APPLICATION_JSON)
public class AuthorResource {
    ...
}`,
            severity: "MINOR",
            structuralElement: "services",
            title: "Resource classes must have a Produces annotation"
        },
        {
            action: "Add missing logic injection on Resource",
            compliantSolution: `@Inject
private AuthorLogic logic;`,
            debt: 15,
            description: "Logic must be injected in resources using @Inject annotations in the field corresponding to the logic.",
            nonCompliantExample: `private AuthorLogic logic;`,
            severity: "MINOR",
            structuralElement: "services",
            title: "Resource classes must have a logic injection as a field"
        },
        {
            action: "Add missing Stateless annotation on Logic",
            compliantSolution: `@Stateless
public class AuthorLogic {
    ...
}`,
            debt: 10,
            description: "Resources must have a Produces annotation defining the type of data it returns.",
            nonCompliantExample: `public class AuthorLogic {
    ...
}`,
            severity: "MINOR",
            structuralElement: "logic",
            title: "Logic layer classes must be annotated with Stateless"
        },
        {
            action: "Add missing persistence injection on Logic",
            compliantSolution: `@Inject
private AuthorPersistence persistence;`,
            debt: 15,
            description: "Persistence must be injected in logic classes using @Inject annotations in the field corresponding to the persistence.",
            nonCompliantExample: `private AuthorPersistence persistence;`,
            severity: "MINOR",
            structuralElement: "logic",
            title: "Logic classes must have a persistence injection as a field"
        },
        {
            action: "Add missing check for nullity and WebApplicationException in resource methods",
            compliantSolution: `@GET
@Path("{authorId : + \\\\d+")
public AuthorDTO getAuthor(@PathParam("authorId") Long id) {
    AuthorEntity entity = logic.getAuthor(id);
    if(entity == null) {
        throw new WebApplicationException("Author with id: " + id + " does not exists", 404);
    }
    ...
    return new AuthorDTO(entity);
}`,
            debt: 15,
            description: "Resource methods that receive parameters must check the existence of the parameter first and then return the corresponding answer or WebApplicationException if not found.",
            nonCompliantExample: `@GET
@Path("{authorId : + \\\\d+")
public AuthorDTO getAuthor(@PathParam("authorId") Long id) {
    AuthorEntity entity = logic.getAuthor(id);
    return new AuthorDTO(entity);
}`,
            severity: "MINOR",
            structuralElement: "services",
            title: "Resource methods must check for existence of entity and throw WebApplicationException in case"
        },
        {
            action: "Make this resource GET method return a DetailDTO or list of them",
            compliantSolution: `@GET
@Path("{id : + \\\\d+")
public BlogDetailDTO getBlog(@PathParam("id") Long id) {
    ...
}`,
            debt: 10,
            description: "Resource GET methods must return DetailDTOs so the information is properly displayed in the frontend. Returning non-Detail DTOs can cause certain information to not appear.",
            nonCompliantExample: `@GET
@Path("{id : + \\\\d+")
public BlogDTO getBlog(@PathParam("id") Long id) {
    ...
}`,
            severity: "MAJOR",
            structuralElement: "services",
            title: "Resource GET methods must return DetailDTOs so their info is properly displayed."
        }
    ];

    componentDidMount() {
        this.setState({
            showing: parseInt(window.location.hash.charAt( window.location.hash.length - 1))
        })
    }

    render() {
        return (
            <div className="App container">
                <h1 className="text-center">Knowledge base for Layered architectural style</h1>
                <div className="accordion" id="accordion">
                    {this.rulesData.map((rule, id) => {
                        return <div className="card">
                            <div className="card-header" id={"heading" + id}>
                                <h4 className="mb-0 container">
                                    <button className="btn" type="button" data-toggle="collapse"
                                            data-target={"#collapse" + id} aria-expanded={id === this.state.showing ? "true" : "false"}
                                            aria-controls={"#collapse" + id}>
                                        <strong>R{id + 1}:</strong> <em>{rule.title}</em>
                                    </button>
                                </h4>
                            </div>
                            <div id={"collapse" + id} className={"collapse " + (id === this.state.showing ? "show" : "")}
                                 aria-labelledby={"heading" + id}
                                 data-parent="#accordion">
                                <div className="card-body">
                                    <div className="small"><i className="material-icons">
                                        label
                                    </i>{rule.structuralElement} <i className="material-icons">
                                        timer
                                    </i>{rule.debt} min. <i className="material-icons">
                                        warning
                                    </i>{rule.severity}     </div>
                                    <p>{rule.description}</p>
                                    <h5>Non-Compliant Example</h5>
                                    <div>
                                        <pre><code className="java">{rule.nonCompliantExample}</code></pre>
                                        <h5>Compliant Solution</h5>
                                        <pre><code className="java">{rule.compliantSolution}</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default App;
