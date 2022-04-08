import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class Checkmark implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Value of the field is stored and used inside the control 
	private _value: boolean;
	// track if the value is null
	private _valueIsNull: boolean;
    // keep referene to the select wrapper
	private _container: HTMLDivElement;
	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;
	// Reference to ComponentFramework Context object
	private _context: ComponentFramework.Context<IInputs>;

    constructor()
    {


    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._notifyOutputChanged = notifyOutputChanged;
		this._context = context;
		this._container = container;

		this._valueIsNull = context.parameters.inputProperty.raw === null;
		this._value = context.parameters.inputProperty.raw;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        this._context = context;

        var _divParentElement  = document.createElement("div");

        var _imgElement: HTMLImageElement;
        //image object is creating...
        _imgElement = document.createElement("img");
        let imageName = "failed.png";
        if (this._value === true){
            imageName = "correct.png";
        }

        context.resources.getResource(imageName, function (data) {

            let imageUrl:string = "data:image/" + "png" + ";base64, " + data;
            _imgElement.src = imageUrl;

        }, function () {});

        _divParentElement.appendChild(_imgElement);
        
        if (this._container.children.length > 0) {
            const element = this._container.children[0];
            element.replaceChild(_divParentElement, element.childNodes[0]);
        }
        else {
            this._container.appendChild(_divParentElement);
        }

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
