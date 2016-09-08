/* --------------------------------------------------------------------------
 * file constants
 * -------------------------------------------------------------------------- */

var TODAY = new Date();
var YYYYMMDD = TODAY.toISOString().substring(0, 10);


/* --------------------------------------------------------------------------
 * rendering functions
 * -------------------------------------------------------------------------- */

function building_url(data, type, row, meta) {
    return "<a href='" + row.url + "'>" + data + "</a>";
}

function bs_glyph_edit(data, type, row, meta) {
    return '<span class="glyphicon glyphicon-edit centericon cursoricon" aria-hidden="true"></span>';
}

function bs_glyph_refused(data, type, row, meta) {
    if (data == 1) {
        return '<span class="glyphicon glyphicon-ban-circle centericon" aria-hidden="true"></span>';
    } else {
        return null;
    }
}

function delete_ambassador_button(data, type, row, meta) {
    return '<div class="ambadelete"> \
        <form class="amba-delete-form" action="' + row.deleteurl + '" method="POST"> \
            <input type="hidden" id="bldng" name="bldng" value="' + row.bldng + '"> \
            <div class="text-center"> \
                <button class="btn btn-danger btn-sm amba-delete-button"> \
                    <span class="glyphicon glyphicon-trash centericon cursoricon" aria-hidden="true"></span> \
                </button> \
            </div> \
        </form> \
    </div>';
}

function delete_event_button(data, type, row, meta) {
    return '<div class="eventdelete"> \
        <form class="event-delete-form" action="' + row.deleteurl + '" method="POST"> \
            <input type="hidden" id="bldng" name="bldng" value="' + row.bldng + '"> \
            <div class="text-center"> \
                <button class="btn btn-danger btn-sm event-delete-button"> \
                    <span class="glyphicon glyphicon-trash centericon cursoricon" aria-hidden="true"></span> \
                </button> \
            </div> \
        </form> \
    </div>';
}

function update_ambassador_form(data) {
    return '<div class="ambaupdate"> \
        <div class="alert alert-danger">Editing ' + data.Ambassador_Name + '</div> \
        <form class="amba-update-form" action="' + data.editurl + '" method="POST"> \
            <div class="form-group"> \
                <label for="Ambassador_Name">Name</label> \
                <input type="text" class="form-control" id="Ambassador_Name" name="Ambassador_Name" placeholder="Name" value="' + data.Ambassador_Name + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Amb_Apartment">Apartment</label> \
                <input type="text" class="form-control" id="Amb_Apartment" name="Amb_Apartment" placeholder="Apartment" value="' + data.Amb_Apartment + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Phone">Phone</label> \
                <input type="tel" class="form-control" id="Phone" name="Phone" placeholder="Phone" value="' + data.Phone + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Email">Email</label> \
                <input type="email" class="form-control" id="Email" name="Email" placeholder="Email" value="' + data.Email + '"> \
            </div> \
            <input type="hidden" id="bldng" name="bldng" value="' + data.bldng + '"> \
            <button class="btn btn-danger amba-update-button">Update</button> \
        </form> \
    </div>';
}

function update_event_form(data) {
    return '<div class="eventupdate"> \
        <div class="alert alert-danger">Editing event at ' + data.Apt_address + '</div> \
        <form class="event-update-form" action="' + data.editurl + '" method="POST"> \
            <div class="form-group"> \
                <label for="Event_type">Event Type</label> \
                <select class="selectpicker form-control" \
                        id="Event_type" \
                        name="Event_type" \
                        placeholder="Event Type"> \
                    <option>Voter Registration</option> \
                    <option>GOTV</option> \
                    <option>Canvass</option> \
                    <option>Messenger Week</option> \
                </select> \
            </div> \
            <div class="form-group"> \
                <label for="Event_date">Date</label> \
                <div class="input-group date" data-provide="datepicker"> \
                    <div class="input-group-addon"> \
                        <span class="glyphicon glyphicon-th"></span> \
                    </div> \
                    <input type="text" class="form-control" id="Event_date" name="Event_date" placeholder="Date" value="' + data.Event_date + '"> \
                </div> \
            </div> \
            <div class="form-group"> \
                <label for="Event_description">Description</label> \
                <input type="text" class="form-control" id="Event_description" name="Event_description" placeholder="Description" value="' + data.Event_description + '"> \
            </div> \
            <div class="form-group"> \
                <label for="Notes">Notes</label> \
                <input type="text" class="form-control" id="Notes" name="Notes" placeholder="Notes" value="' + data.Notes + '"> \
            </div> \
            <div class="form-group"> \
                <div class="checkbox"> \
                    <label> \
                        <input type="checkbox" id="Refused_Event" name="Refused_Event">Refused Event \
                    </label> \
                </div> \
            </div> \
            <input type="hidden" id="Apt_address" name="Apt_address" value="' + data.Apt_address + '"> \
            <input type="hidden" id="bldng" name="bldng" value="' + data.bldng + '"> \
            <button class="btn btn-danger event-update-button">Update</button> \
        </form> \
    </div>';
}


/* --------------------------------------------------------------------------
 * making tables
 * -------------------------------------------------------------------------- */

function draw_building_table(tabId, buildingData) {
    $(document).ready(function() {
        var buildingtable = $(tabId).DataTable({
            'data': buildingData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs buildings ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs buildings ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs buildings ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                {
                    'title': 'Address',
                    'data': 'address',
                    'render': building_url
                },
                { 'title': 'Building', 'data': 'neighborhood' },
                { 'title': 'Precinct', 'data': 'precinct' },
                { 'title': 'Unit Count', 'data': 'unitcount' },
                { 'title': 'Door Count', 'data': 'doorcount' },
                { 'title': 'Voter Count', 'data': 'votercount' },
                { 'title': 'Volunteer Count', 'data': 'volcount' }
            ],
            'order': [3, 'desc'],
            'pageLength': 50
        });

        buildingtable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_voter_table(tabId, voterData, building) {
    $(document).ready(function() {
        var votertable = $(tabId).DataTable({
            'data': voterData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs voters ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                { 'title': 'Name', 'data': 'Name' },
                { 'title': 'Address', 'data': 'Address' },
                { 'title': 'City', 'data': 'City' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
                { 'title': 'Age', 'data': 'Age' },
                { 'title': 'Likely Party', 'data': 'Likely_party' }/*,
                { 'title': 'Make an Ambassador', 'render': new_ambassador_form }*/
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        votertable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_volunteer_table(tabId, volunteerData, building) {
    $(document).ready(function() {
        var volunteertable = $(tabId).DataTable({
            'data': volunteerData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs volunteers ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                { 'title': 'Name', 'data': 'Name' },
                { 'title': 'Address', 'data': 'Address' },
                { 'title': 'City', 'data': 'City' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
                { 'title': 'Age', 'data': 'Age' }/*,
                { 'title': 'Make Ambassador', 'render': new_ambassador_form }*/
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        volunteertable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}

function draw_ambassador_table(tabId, ambassadorData, building) {
    $(document).ready(function() {
        var ambassadortable = $(tabId).DataTable({
            'data': ambassadorData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs ambassadors ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                {
                    'className': 'details-control dt-center',
                    'orderable': false,
                    'data': 'ambassadorID',
                    'render': bs_glyph_edit
                },
                { 'title': 'Name', 'data': 'Ambassador_Name' },
                { 'title': 'Apartment', 'data': 'Amb_Apartment' },
                { 'title': 'Phone', 'data': 'Phone' },
                { 'title': 'Email', 'data': 'Email' },
                {
                    'className': 'amba-delete dt-center',
                    'orderable': false,
                    'title': 'Delete Ambassador',
                    'data': 'ambassadorID',
                    'render': delete_ambassador_button
                },
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        ambassadortable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );

        // add event listener for opening and closing details
        $(tabId + ' tbody').on('click', 'td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = ambassadortable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(update_ambassador_form(row.data())).show();
                tr.addClass('shown');

                // add confirm dialog to all update buttons
                $(function() {
                    $('.amba-update-button').click(function(e) {
                        e.preventDefault();
                        if (confirm('Click OK to UPDATE user:')) {
                            e.target.closest('form.amba-update-form').submit();
                        }
                    });
                });
            }
        });

        // add confirm dialog to all delete buttons
        $(function() {
            $('.amba-delete-button').click(function(e) {
                e.preventDefault();
                if (confirm('Click OK to DELETE user:')) {
                    e.target.closest('form.amba-delete-form').submit();
                }
            });
        });
    });
}

function draw_event_table(tabId, eventData, building) {
    $(document).ready(function() {
        var eventtable = $(tabId).DataTable({
            'data': eventData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs events ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs events ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs events ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                {
                    'className': 'details-control dt-center',
                    'orderable': false,
                    'data': 'eventID',
                    'render': bs_glyph_edit
                },
                { 'title': 'Apartment', 'data': 'Apt_address' },
                { 'title': 'Date', 'data': 'Event_date' },
                { 'title': 'Event Type', 'data': 'Event_type' },
                { 'title': 'Description', 'data': 'Event_description' },
                {
                    'title': 'Refused Event',
                    'data': 'Refused_Event',
                    'render': bs_glyph_refused
                },
                { 'title': 'Notes', 'data': 'Notes' },
                { 'title': 'Update Date', 'data': 'Update_date' },
                {
                    'className': 'event-delete dt-center',
                    'orderable': false,
                    'title': 'Delete Event',
                    'data': 'eventID',
                    'render': delete_event_button
                },
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        eventtable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );

        // add event listener for opening and closing details
        $(tabId + ' tbody').on('click', 'td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = eventtable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(update_event_form(row.data())).show();
                tr.addClass('shown');

                // add confirm dialog to all update buttons
                $(function() {
                    $('.event-update-button').click(function(e) {
                        e.preventDefault();
                        if (confirm('Click OK to UPDATE user:')) {
                            e.target.closest('form.event-update-form').submit();
                        }
                    });
                });
            }
        });

        // add confirm dialog to all delete buttons
        $(function() {
            $('.event-delete-button').click(function(e) {
                e.preventDefault();
                if (confirm('Click OK to DELETE user:')) {
                    e.target.closest('form.event-delete-form').submit();
                }
            });
        });
    });
}

function draw_unregistered_apts_table(tabId, noVoterAptData, building) {
    $(document).ready(function() {
        var noVoterApttable = $(tabId).DataTable({
            'data': noVoterAptData,
            'buttons': [
                'copy',
                { 'extend': 'csv', filename: 'mubs unregistered apts ' + building + ' ' + YYYYMMDD },
                { 'extend': 'excel', filename: 'mubs unregistered apts ' + building + ' ' + YYYYMMDD },
                { 'extend': 'pdf', filename: 'mubs unregistered apts ' + building + ' ' + YYYYMMDD },
                'print'
            ],
            'columns': [
                { 'title': 'Apartment Address', 'data': 'Address' },
                { 'title': 'Unit Number', 'data': 'UnitNum' }
            ],
            'order': [1, 'asc'],
            'pageLength': 50
        });

        noVoterApttable.buttons().container()
            .appendTo( tabId + '_wrapper .col-sm-6:eq(0)' );
    });
}
